'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { InfoSection } from './InfoSection';
import { Alert, AlertDescription, AlertTitle } from '@/components/atoms/alert';
import { Info, FileText, GraduationCap, CreditCard, CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/atoms/button';

export function EquivalenciaPreparacao() {
     const [hasPedidoAtivo, _] = useState(false);
    const [__, setIniciarPedido] = useState(false);

    function handleSubmitPedido(){
        setIniciarPedido(true)
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
          <div className="max-w-4xl mx-auto px-4 py-10 md:py-16">
                {/* Cabeçalho */}
                <motion.header
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center justify-center mb-4">
                        <Sparkles className="text-blue-600 w-8 h-8 animate-pulse" />
                    </div>
                    <h1 className="text-blue-900 font-bold text-3xl md:text-4xl mb-3">
                        Preparar o seu Pedido de Equivalência
                    </h1>
                    <p className="text-gray-700 max-w-2xl mx-auto">
                        Antes de iniciar, leia atentamente as informações abaixo para garantir que o seu pedido seja submetido com sucesso.
                    </p>
                </motion.header>

                {/* Conteúdo Principal */}
                <main className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <InfoSection
                            icon={<FileText className="size-6 text-blue-600" />}
                            title="Verifique os seus dados de contacto"
                        >
                            <p className="text-gray-700">
                                Confirme se o seu email e telefone estão atualizados no perfil. Caso contrário, atualize-os antes de avançar.
                            </p>
                        </InfoSection>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <InfoSection
                            icon={<GraduationCap className="size-6 text-blue-600" />}
                            title="Reúna a sua documentação académica"
                        >
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex gap-3">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span><strong>Instituição:</strong> Use o nome oficial conforme o seu certificado</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-blue-600 mt-1">•</span>
                                    <span><strong>Documentos legíveis:</strong> Digitalize com boa resolução para evitar indeferimentos</span>
                                </li>
                            </ul>
                        </InfoSection>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <InfoSection
                            icon={<CreditCard className="size-6 text-blue-600" />}
                            title="Compreenda o processo de pagamento"
                        >
                            <div className="space-y-6">
                                {/* Fase 1 */}
                                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-blue-100">
                                    <h3 className="text-blue-900 font-semibold mb-2">
                                        1. Taxa de Análise e Validação
                                    </h3>
                                    <ul className="space-y-2 ml-4 text-gray-700">
                                        <li className="flex gap-2"><span className="text-blue-600">•</span> Obrigatória para início da análise</li>
                                        <li className="flex gap-2"><span className="text-blue-600">•</span> Processo inicia após confirmação do pagamento</li>
                                        <li className="flex gap-2"><span className="text-blue-600">•</span> Valor não reembolsável</li>
                                    </ul>
                                </div>

                                {/* Fase 2 */}
                                <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-blue-100">
                                    <h3 className="text-blue-900 font-semibold mb-2">
                                        2. Taxa de Emissão de Certificado
                                    </h3>
                                    <ul className="space-y-2 ml-4 text-gray-700">
                                        <li className="flex gap-2"><span className="text-blue-600">•</span> Apenas se o pedido for deferido</li>
                                        <li className="flex gap-2"><span className="text-blue-600">•</span> Novo DUC gerado após aprovação</li>
                                    </ul>
                                </div>

                                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-lg">
                                    <p className="text-gray-700">
                                        <strong className="text-blue-900">Como pagar:</strong> via DUC, online ou em balcões Multibanco.
                                    </p>
                                </div>
                            </div>
                        </InfoSection>
                    </motion.div>
                </main>

                {/* Notificação de Pedido Ativo */}
                {hasPedidoAtivo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Alert className="mt-10 bg-blue-50 border-blue-200">
                            <Info className="size-5 text-blue-600" />
                            <AlertTitle className="text-blue-900">
                                Já existe um pedido ativo
                            </AlertTitle>
                            <AlertDescription className="text-blue-800">
                                Há um pedido de equivalência em andamento associado à sua conta.
                            </AlertDescription>
                            <div className="mt-4">
                                <Button
                                    variant="default"
                                    className="bg-blue-600 hover:bg-blue-700 transition-all"
                                    onClick={() => alert('Redirecionando para acompanhar pedido...')}
                                >
                                    Acompanhar Pedido Ativo
                                </Button>
                            </div>
                        </Alert>
                    </motion.div>
                )}

                {/* Botão principal */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                >
                    <Button
                        size="lg"
                        disabled={hasPedidoAtivo}
                        onClick={() => alert('Iniciando novo pedido de equivalência...')}
                        className={`px-8 py-3 font-semibold rounded-full text-white shadow-lg transition-all duration-300 ${
                            hasPedidoAtivo
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 hover:shadow-green-300'
                        }`}
                    >
                        {hasPedidoAtivo ? (
                            <>
                                <Info className="mr-2 h-5 w-5" /> Já existe um pedido ativo
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="mr-2 h-5 w-5" /> Iniciar Novo Pedido de Equivalência
                            </>
                        )}
                    </Button>

                    {/* botão demo */}
                    <div className="mt-6">
                        <button
                            onClick={() => handleSubmitPedido}
                            className="text-sm text-blue-600 hover:underline"
                        >
                            🔄 Alternar estado demo ({hasPedidoAtivo ? 'Ativo' : 'Sem pedido'})
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
