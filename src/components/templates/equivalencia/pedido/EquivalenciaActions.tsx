'use client';
import { motion } from 'framer-motion';
import { Button } from '@/components/atoms/button';
import {Send, LoaderPinwheel, HardDriveUpload} from 'lucide-react';
import {useContext} from "react";
import {EquivalenciaCreateContext} from "@/components/templates/equivalencia/pedido/context/EquivalenciaContext";

export function EquivalenciaActions() {
    const value_context = useContext(EquivalenciaCreateContext);
    const { handleSubmitPedido, isLoading, params, pedido_feito } = value_context || {};

    const podeAlterar = pedido_feito?.pedidos?.[0]?.podeAlterarSolic;
    const isDisabled = isLoading || podeAlterar === false;

    const num = params?.n_processo;
    const num2= Array.isArray(num) ? num[0] : num;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
        >
            <Button
                onClick={() => handleSubmitPedido?.(num2)}
                disabled={isDisabled}
                className={`flex-1 h-12 border-2 font-semibold shadow-lg ${
                    isDisabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                }`}
            >
            {isLoading ? (
                    <span className="flex items-center justify-center w-full">
                        <motion.span
                            className="mr-2 animate-spin"
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                            <LoaderPinwheel/>
                        </motion.span>
                        A enviar...
                    </span>
                ) : (
                    <>
                        {num ? <HardDriveUpload className="w-4 h-4 mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                        {num ? 'Atualizar Pedido' : 'Submeter Pedido'}
                    </>
                )}
            </Button>
        </motion.div>
    );
}
