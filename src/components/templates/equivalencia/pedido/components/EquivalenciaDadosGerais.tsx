'use client';
import {motion} from 'framer-motion';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/atoms/card';
import {Label} from '@/components/atoms/label';
import {Input} from '@/components/atoms/input';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/atoms/select';
import {User} from "lucide-react";
import {useContext} from "react";
import {EquivalenciaCreateContext} from "@/components/templates/equivalencia/pedido/context/EquivalenciaContext";

const confiStyle = 'cursor-not-allowed text-gray-400 focus:outline-0'

export function EquivalenciaDadosGerais({disabled = false}) {
    const isLocked = disabled;
    const lockClass = "cursor-not-allowed bg-gray-100 opacity-70";

    const value_context = useContext(EquivalenciaCreateContext);
    const {user, formData, handleChange, setFormData, documentoIdentificacao, habilitacoes} = value_context || {};
    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, delay: 0.2}}
        >
            <Card className='dark:bg-[#1d293d]'>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="w-7 h-7 text-blue-600"/>
                        Dados Pessoais
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Tipo de Documento de Identificação */}
                        <div>
                            <Label htmlFor="tipoEquivalencia">Tipo de Documento de Identificação *</Label>
                            {user?.pessoa_info?.tipo_documento ? (
                                <Input
                                    required
                                    id="requerente.docIdentificacao"
                                    name="requerente.docIdentificacao"
                                    value={user?.pessoa_info?.tipo_documento || formData?.['requerente.docIdentificacao']}
                                    onChange={handleChange}
                                    className={`h-12 border-2 ${user?.pessoa_info?.tipo_documento ? confiStyle : ''}`}
                                />
                            ) : (
                                <Select
                                    name="requerente.docIdentificacao"
                                    value={user?.pessoa_info?.tipo_documento || formData?.['requerente.docIdentificacao']}
                                    onValueChange={(value) =>
                                        handleChange?.({target: {name: 'requerente.docIdentificacao', value}})
                                    }
                                >
                                    <SelectTrigger className="h-12 border-2">
                                        <SelectValue placeholder="Seleciona o tipo"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {documentoIdentificacao?.map((tipo, idx) => (
                                            <SelectItem key={idx} value={tipo.value}>
                                                {tipo.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}

                        </div>

                        {/* Número do Documento de Identificação */}
                        <div>
                            <Label htmlFor="requerente.docNumero">Número do Documento de Identificação *</Label>
                            <Input
                                required
                                id="requerente.docNumero"
                                name="requerente.docNumero"
                                value={user?.pessoa_info?.num_documento || formData?.['requerente.docNumero']}
                                onChange={handleChange}
                                className={`h-12 border-2 ${user?.pessoa_info?.num_documento ? confiStyle : ''}`}
                                placeholder="Insere o número do documento"
                            />
                        </div>

                        {/* Data de Emissão */}
                        <div>
                            <Label htmlFor="requerente.dataEmissaoDoc">Data de Emissão *</Label>
                            <Input
                                required
                                id="requerente.dataEmissaoDoc"
                                name="requerente.dataEmissaoDoc"
                                value={user?.pessoa_info?.dt_emissao || formData?.['requerente.dataEmissaoDoc']}
                                type="date"
                                className={`h-12 border-2 ${user?.pessoa_info?.dt_emissao ? confiStyle : ''} `}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Data de Validade */}
                        <div>
                            <Label htmlFor="requerente.dataValidadeDoc">Data de Validade *</Label>
                            <Input
                                required
                                id="requerente.dataValidadeDoc"
                                name="requerente.dataValidadeDoc"
                                type="date"
                                value={user?.pessoa_info?.dt_validade || formData?.['requerente.dataValidadeDoc']}
                                onChange={handleChange}
                                className={`h-12 border-2 ${user?.pessoa_info?.dt_validade ? confiStyle : ''}`}
                            />
                        </div>

                        {/* Nome Completo */}
                        <div>
                            <Label htmlFor="requerente.nome">Nome Completo *</Label>
                            <Input
                                required
                                id="requerente.nome"
                                name="requerente.nome"
                                value={user?.pessoa_info?.nome || formData?.['requerente.nome']}
                                onChange={handleChange}
                                className={`h-12 border-2 ${user?.pessoa_info?.nome ? confiStyle : ''}`}
                                placeholder="Insere o nome completo"
                            />
                        </div>

                        {/* Data de Nascimento */}
                        <div>
                            <Label htmlFor="requerente.dataNascimento">Data de Nascimento *</Label>
                            <Input
                                required
                                id="requerente.dataNascimento"
                                name="requerente.dataNascimento"
                                type="date"
                                value={user?.pessoa_info?.data_nasc || formData?.['requerente.dataNascimento']}
                                onChange={handleChange}
                                className={`h-12 border-2 ${user?.pessoa_info?.data_nasc ? confiStyle : ''}`}
                            />
                        </div>

                        {/* Nacionalidade */}
                        <div>
                            <Label htmlFor="requerente.nacionalidade">Nacionalidade *</Label>
                            <Input
                                required
                                id="requerente.nacionalidade"
                                name="requerente.nacionalidade"
                                value={user?.pessoa_info?.nacionalidade || formData?.['requerente.nacionalidade']}
                                onChange={handleChange}
                                className={`h-12 border-2 ${user?.pessoa_info?.nacionalidade ? confiStyle : ''}`}
                                placeholder="Insere a nacionalidade"
                            />
                        </div>

                        {/* Sexo */}
                        <div>
                            <Label htmlFor="requerente.sexo">Sexo *</Label>
                            {user?.pessoa_info?.sexo ? (
                                <Input
                                    required
                                    id="requerente.sexo"
                                    name="requerente.sexo"
                                    value={user?.pessoa_info?.sexo_desc}
                                    onChange={handleChange}
                                    className={`h-12 border-2 ${user?.pessoa_info?.sexo ? confiStyle : ""}`}
                                    placeholder="Seleciona o sexo"
                                />
                            ) : (
                                <Select
                                    name="requerente.sexo"
                                    value={user?.pessoa_info?.sexo_desc}
                                    onValueChange={(value) =>
                                        handleChange?.({target: {name: "requerente.sexo", value}})
                                    }
                                >
                                    <SelectTrigger className="h-12 border-2">
                                        <SelectValue placeholder="Seleciona o sexo"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="masculino">Masculino</SelectItem>
                                        <SelectItem value="feminino">Feminino</SelectItem>
                                        <SelectItem value="outro">Outro</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <Label htmlFor="requerente.email">Email *</Label>
                            <Input
                                required
                                id="requerente.email"
                                name="requerente.email"
                                type="email"
                                value={formData?.['requerente.email'] !== undefined ? formData?.['requerente.email'] : user?.pessoa_info?.email || ''}
                                onChange={handleChange}
                                className={`${isLocked ? lockClass : ""} h-12 border-2`}
                                placeholder="Insere o email"
                            />
                        </div>

                        {/* Telefone/Telemóvel */}
                        <div>
                            <Label htmlFor="requerente.contato">Telefone/Telemóvel *</Label>
                            <Input
                                required
                                id="requerente.contato"
                                name="requerente.contato"
                                value={formData?.['requerente.contato'] !== undefined ? formData?.['requerente.contato'] : user?.pessoa_info?.telefone || ''}
                                onChange={handleChange}
                                className={`${isLocked ? lockClass : ""} h-12 border-2`}
                                placeholder="Insere o telefone"
                            />
                        </div>

                        {/* NIF */}
                        <div>
                            <Label htmlFor="requerente.nif">NIF *</Label>
                            <Input
                                required
                                id="requerente.nif"
                                name="requerente.nif"
                                value={user?.pessoa_info?.nif || formData?.['requerente.nif']}
                                onChange={(e) => {
                                    let value = e.target.value.replace(/\D/g, '');
                                    value = value.slice(0, 9);
                                    if (setFormData) {
                                        setFormData(prev => ({
                                            ...prev,
                                            'requerente.nif': value
                                        }));
                                    }
                                }}
                                className={`h-12 border-2 ${user?.pessoa_info?.nif ? confiStyle : ''}`}
                                placeholder="Insere o NIF"
                                inputMode="numeric"
                            />
                        </div>

                        {/* Habilitação Escolar */}
                        <div>
                            <Label htmlFor="requerente.habilitacao">Habilitação Escolar *</Label>
                            <Select
                                name="requerente.habilitacao"
                                value={(formData?.['requerente.habilitacao'] as string) || ''}
                                onValueChange={(value) =>
                                    handleChange?.({target: {name: 'requerente.habilitacao', value}})
                                }
                            >
                                <SelectTrigger className={`${isLocked ? lockClass : ""} h-12 border-2`}>
                                    <SelectValue placeholder="Selecionar habilitação"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {habilitacoes?.map((tipo, idx) => (
                                        <SelectItem key={idx} value={tipo.value}>
                                            {tipo.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
