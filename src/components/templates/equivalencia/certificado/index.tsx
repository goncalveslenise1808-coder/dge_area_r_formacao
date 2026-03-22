'use client';
import { useState } from 'react';
import { Award } from 'lucide-react';
import { EquivalenciaCertificadoStats } from './EquivalenciaCertificadoStats';
import { EquivalenciaCertificadoList } from './EquivalenciaCertificadoList';
import { EquivalenciaCertificadoDetails } from './EquivalenciaCertificadoDetails';
import {IEquivalencia} from "@/services/equivalencia/certificado/type";
import {CardInfo} from "@/components/organisms/CardInfo/CardInfo";

const certificadosEquivalencia = [
    {
        id: 1,
        numeroProcesso: 'EQ-2023-005678',
        tipoEquivalencia: 'Equivalência de Formação Profissional',
        formacaoOriginal: 'Curso de Marketing Digital',
        entidadeOriginal: 'Google Digital Academy',
        paisOriginal: 'Estados Unidos',
        equivalenciaPortuguesa: 'Curso de Especialização Tecnológica em Marketing Digital',
        nivelEquivalencia: 'Nível 4 (Curso Técnico Superior)',
        dataEmissao: '15 Dez 2023',
        numeroSerie: 'DGERT-EQ-2023-001234',
        validacao: 'https://validacao.dgert.pt/eq001234',
        entidadeEmissora: 'DGERT - Direção-Geral do Emprego e das Relações de Trabalho',
        observacoes: 'Equivalência total reconhecida para efeitos profissionais e académicos.'
    },
    {
        id: 2,
        numeroProcesso: 'EQ-2022-003456',
        tipoEquivalencia: 'Equivalência de Habilitações Académicas',
        formacaoOriginal: 'Bachelor in Computer Science',
        entidadeOriginal: 'University of California',
        paisOriginal: 'Estados Unidos',
        equivalenciaPortuguesa: 'Licenciatura em Engenharia Informática',
        nivelEquivalencia: 'Nível 6 (Licenciatura)',
        dataEmissao: '20 Set 2022',
        numeroSerie: 'DGES-EQ-2022-007890',
        validacao: 'https://validacao.dges.pt/eq007890',
        entidadeEmissora: 'DGES - Direção-Geral do Ensino Superior',
        observacoes: 'Equivalência reconhecida para prosseguimento de estudos e exercício profissional.'
    }
];

export function EquivalenciaCertificadoTemplate({
    data
}:{
    data: IEquivalencia | IEquivalencia[]
}) {
    const arrayData = Array.isArray(data) ? data : [data];

    const [selectedCertificado, setSelectedCertificado] = useState(arrayData[0]);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCertificados = arrayData.filter(cert =>
        cert.formacaoOriginal.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.numeroProcesso.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDownload = (certificado: string) => {

        const link = document.createElement('a');
        link.href = certificado;

        const urlParts = certificado.split('/');
        const fileName = urlParts[urlParts.length - 1].split('?')[0] || 'download';

        link.download = fileName;
        link.target = '_blank';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    const handleShare = (certificado: any) => {
        console.log('Partilhar certificado:', certificado.id);
    };

    const handleValidate = (validacao: string) => {
        window.open(validacao, '_blank');
    };

    return (
        <div className="space-y-8">

            <EquivalenciaCertificadoStats
               certificados={certificadosEquivalencia}
            />

            <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
                     fill="none" stroke="currentColor"
                     strokeWidth="2"
                     viewBox="0 0 24 24">
                     <circle cx="11" cy="11" r="8" />
                     <path d="M21 21l-4.35-4.35" />
                </svg>
                <input
                    placeholder="Pesquisar certificados..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 text-base border-2 rounded-md w-full"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <EquivalenciaCertificadoList
                    certificados={filteredCertificados}
                    selectedCertificado={selectedCertificado}
                    setSelectedCertificado={setSelectedCertificado}
                />

                <EquivalenciaCertificadoDetails
                    certificado={selectedCertificado}
                    onDownload={handleDownload}
                    onShare={handleShare}
                    onValidate={handleValidate}
                />
            </div>

            <CardInfo
                icon={Award}
                title={'Informações sobre os Certificados de Equivalência'}
                items={[
                    'Os certificados de equivalência são válidos em todo o território nacional',
                    'Podem ser utilizados para prosseguimento de estudos e exercício profissional',
                    'A validação online confirma a autenticidade do documento',
                    'Os certificados ficam disponíveis permanentemente na tua área',
                    'Em caso de dúvidas, contacta a entidade emissora indicada no certificado'
                ]}
            />
        </div>
    );
}