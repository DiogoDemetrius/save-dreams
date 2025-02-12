import { vmService } from '../services/vm.service';

export function VMButton({ vmId }: { vmId: string }) {
  const handleStartVM = async () => {
    try {
      await vmService.startVM({
        PROXMOX_API: process.env.PROXMOX_API!,
        USERNAME: process.env.PROXMOX_USER!,
        PASSWORD: process.env.PROXMOX_PASSWORD!,
        NODE: process.env.PROXMOX_NODE!,
        VMID: vmId
      });
      
      toast.success('VM iniciada com sucesso!');
    } catch (error) {
      toast.error('Erro ao iniciar VM');
      console.error(error);
    }
  };

  return (
    <button 
      onClick={handleStartVM}
      className="btn btn-primary"
    >
      Ativar VM
    </button>
  );
} 