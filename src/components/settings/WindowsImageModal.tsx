import { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Upload, Loader2 } from 'lucide-react';

interface WindowsImageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WindowsImageModal({ isOpen, onClose }: WindowsImageModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    try {
      // Implementar integração com backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      onClose();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gerenciar Imagem do Windows">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-dreams-lilac-light">
            Nova Imagem do Windows
          </label>
          <div className="border-2 border-dashed border-dreams-lilac/10 rounded-lg p-6">
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-dreams-lilac-light mb-4" />
              <p className="text-dreams-lilac-light text-sm text-center mb-4">
                Arraste e solte o arquivo ISO aqui ou
              </p>
              <input
                type="file"
                accept=".iso"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                className="hidden"
                id="windows-image"
              />
              <label
                htmlFor="windows-image"
                className="px-4 py-2 bg-dreams-bg-dark border border-dreams-lilac/10 rounded-lg text-dreams-lilac-light hover:border-dreams-blue-light cursor-pointer transition-colors"
              >
                Selecionar Arquivo
              </label>
            </div>
          </div>
          {selectedFile && (
            <p className="text-sm text-dreams-lilac-light">
              Arquivo selecionado: {selectedFile.name}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-dreams-lilac-light hover:text-white transition-colors"
            disabled={isUploading}
          >
            Cancelar
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className="px-4 py-2 bg-gradient-to-r from-dreams-blue to-dreams-lilac text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={18} />
                Enviando...
              </>
            ) : (
              'Enviar Imagem'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}