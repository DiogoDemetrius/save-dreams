import { useState, useEffect } from 'react';
import { Modal } from './ui/Modal';
import { 
  Loader2, Key, Monitor, RefreshCw, CheckCircle2, Copy, Shield,
  Cpu, CircuitBoard, HardDrive, Users, Search 
} from 'lucide-react';
import { Button } from './ui/Button';
import { toast } from 'sonner';
import { vmService } from '../services/vm.service';
import { useVMStore } from '../stores/vmStore';

interface VMConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  vmName: string;
}

export function VMConnectionModal({ isOpen, onClose, vmName }: VMConnectionModalProps) {
  const [stage, setStage] = useState<'checking' | 'queue' | 'initializing' | 'connecting' | 'ready'>('checking');
  const [queuePosition, setQueuePosition] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [moonlightPin, setMoonlightPin] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [vmInfo, setVmInfo] = useState({
    ip: '',
    username: '',
    password: ''
  });

  const { status, updateStatus } = useVMStore();

  useEffect(() => {
    let statusInterval: NodeJS.Timeout;

    if (isOpen) {
      const checkStatus = async () => {
        try {
          const vmStatus = await vmService.getStatus(vmName);
          updateStatus(vmName, vmStatus);
          
          switch (vmStatus.status) {
            case 'running':
              if (vmStatus.ip && vmStatus.credentials) {
                setStage('ready');
                setVmInfo({
                  ip: vmStatus.ip,
                  username: vmStatus.credentials.username,
                  password: vmStatus.credentials.password
                });
              }
              break;
            case 'queue':
              setStage('queue');
              if (vmStatus.queuePosition) {
                setQueuePosition(vmStatus.queuePosition);
                setEstimatedTime(vmStatus.queuePosition * 30);
              }
              break;
            case 'starting':
              setStage('initializing');
              setEstimatedTime(60);
              break;
            default:
              setStage('checking');
          }
        } catch (error) {
          toast.error('Erro ao verificar status da máquina. Tente novamente em alguns instantes.', {
            duration: 5000
          });
          onClose();
        }
      };

      // Initial check
      checkStatus();

      // Set up polling interval - check every 5 seconds
      statusInterval = setInterval(checkStatus, 5000);
    }

    return () => {
      if (statusInterval) {
        clearInterval(statusInterval);
      }
    };
  }, [isOpen, vmName, updateStatus]);

  const handleSendPin = async () => {
    if (moonlightPin.length !== 4) {
      toast.error('O PIN deve ter exatamente 4 dígitos');
      return;
    }

    setIsLoading(true);
    try {
      await vmService.sendMoonlightPin(vmName, moonlightPin);
    } catch (error) {
      // Error is handled by the service
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copiado para área de transferência`);
    }).catch(() => {
      toast.error('Erro ao copiar para área de transferência');
    });
  };

  const formatEstimatedTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds} segundos`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}${remainingSeconds > 0 ? ` e ${remainingSeconds} segundos` : ''}`;
  };

  const renderStage = () => {
    switch (stage) {
      case 'checking':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-4 p-8 bg-black/20 rounded-2xl">
              <Search className="text-dreams-blue-light w-8 h-8 animate-pulse" />
              <div className="flex flex-col items-center">
                <span className="text-white text-lg mb-2">Verificando Status</span>
                <span className="text-sm text-dreams-lilac-light">
                  Aguarde enquanto verificamos a disponibilidade da máquina...
                </span>
              </div>
            </div>
            <div className="h-2 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-to-r from-dreams-blue to-dreams-lilac animate-pulse" />
            </div>
          </div>
        );

      case 'queue':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-4 p-8 bg-black/20 rounded-2xl">
              <Users className="text-dreams-blue-light w-8 h-8 animate-pulse" />
              <div className="flex flex-col items-center">
                <span className="text-white text-lg mb-2">Posição na Fila</span>
                <span className="text-3xl font-bold bg-gradient-to-r from-dreams-blue to-dreams-lilac bg-clip-text text-transparent">
                  #{queuePosition}
                </span>
                <span className="text-sm text-dreams-lilac-light mt-2">
                  Tempo estimado: {formatEstimatedTime(estimatedTime)}
                </span>
              </div>
            </div>
            <div className="h-2 bg-black/30 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-dreams-blue to-dreams-lilac transition-all duration-500"
                style={{ width: `${Math.max(0, 100 - (queuePosition * 20))}%` }}
              />
            </div>
          </div>
        );

      case 'initializing':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-4 p-8 bg-black/20 rounded-2xl">
              <Loader2 className="animate-spin text-dreams-blue-light w-8 h-8" />
              <div className="flex flex-col items-center">
                <span className="text-white text-lg mb-2">Inicializando sua máquina virtual</span>
                <span className="text-sm text-dreams-lilac-light">
                  Tempo estimado: {formatEstimatedTime(estimatedTime)}
                </span>
              </div>
            </div>
            <div className="space-y-4 bg-black/20 p-6 rounded-2xl">
              <div className="flex items-center space-x-3 text-dreams-lilac-light">
                <Cpu className="w-5 h-5" />
                <span>Alocando processador</span>
              </div>
              <div className="flex items-center space-x-3 text-dreams-lilac-light">
                <CircuitBoard className="w-5 h-5" />
                <span>Configurando memória</span>
              </div>
              <div className="flex items-center space-x-3 text-dreams-lilac-light">
                <HardDrive className="w-5 h-5" />
                <span>Preparando armazenamento</span>
              </div>
            </div>
            <div className="h-2 bg-black/30 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-dreams-blue to-dreams-lilac animate-progress-bar" />
            </div>
          </div>
        );
      
      case 'ready':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3 text-green-400">
              <CheckCircle2 />
              <span>Máquina pronta para conexão!</span>
            </div>

            <div className="bg-black/30 p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-3 text-dreams-lilac-light mb-4">
                <Monitor size={20} />
                <span className="font-semibold">Informações de Conexão</span>
              </div>
              
              {Object.entries(vmInfo).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-dreams-lilac-light capitalize">{key}:</span>
                  <div className="flex items-center gap-2">
                    <code className="px-3 py-1 bg-black/40 rounded text-dreams-blue-light font-mono">
                      {value}
                    </code>
                    <button
                      onClick={() => handleCopyToClipboard(value, key)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                      aria-label={`Copiar ${key}`}
                    >
                      <Copy size={16} className="text-dreams-lilac-light" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <label className="block text-dreams-lilac-light text-sm">
                PIN do Moonlight (4 dígitos)
              </label>
              <input
                type="text"
                maxLength={4}
                value={moonlightPin}
                onChange={(e) => setMoonlightPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="w-full bg-black/30 border border-dreams-blue/30 rounded-lg px-4 py-3 text-white text-center text-2xl tracking-wider focus:border-dreams-blue outline-none"
                placeholder="0000"
              />
            </div>

            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={handleSendPin}
                disabled={isLoading || moonlightPin.length !== 4}
                className="flex items-center gap-2 min-w-[140px]"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Key size={18} />
                )}
                {isLoading ? 'Enviando...' : 'Enviar PIN'}
              </Button>
              <Button
                onClick={() => window.open('https://interface.dreamslatam.com/connect', '_blank')}
                disabled={moonlightPin.length !== 4}
                className="flex items-center gap-2 text-black min-w-[140px]"
              >
                <RefreshCw size={18} />
                Conectar
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-dreams-lilac-light text-sm">
              <Shield size={16} className="text-green-400" />
              <p>Conexão segura estabelecida</p>
            </div>
          </div>
        );
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Máquina Virtual: ${vmName}`}
    >
      <div className="space-y-6">
        {renderStage()}
      </div>
    </Modal>
  );
}