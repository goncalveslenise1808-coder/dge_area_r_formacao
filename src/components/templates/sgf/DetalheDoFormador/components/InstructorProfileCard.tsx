import {Card, CardContent} from "@/components/atoms/card";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/atoms/avatar";
import {Mail, MapPin, Phone, Star} from "lucide-react";
import {Badge} from "@/components/atoms/badge";
import {Separator} from "@/components/atoms/separator";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/atoms/tooltip";

interface InstructorProfileCardPorps {
    account: any
}

export function InstructorProfileCard(props: InstructorProfileCardPorps) {
    const {account} = props

    const [firstName, secondName] = account?.pessoa_info.nome.split(" ")
    const initials = firstName[0] + secondName[0];
    
    return (
        <Card className="md:col-span-1">
            <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                    <div className="relative w-24 h-24">
                        <Avatar className="h-24 w-24">
                            <AvatarImage
                                className='flex justify-center items-center'
                                src={account?.pessoa_info?.foto || ""}
                            />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        {
                            account.status === "ATIVO" ? (
                                <Tooltip>
                                    <TooltipTrigger>
                                         <span
                                             className="absolute bottom-1 right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Ativo</p>
                                    </TooltipContent>
                                </Tooltip>
                            ) : (
                                <Tooltip>
                                    <TooltipTrigger>
                                         <span
                                             className="absolute bottom-1 right-1 h-4 w-4 bg-red-500 rounded-full border-2 border-white"></span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Inativo</p>
                                    </TooltipContent>
                                </Tooltip>
                            )
                        }
                    </div>
                    <h2 className="mt-4 text-xl font-semibold">{firstName + secondName}</h2>
                    <p className="text-sm text-muted-foreground">Formador Sénior</p>
                    <div className="mt-2 flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400"/>
                        <span className="font-medium">4.8</span>
                        <span className="text-muted-foreground">(127 avaliações)</span>
                    </div>
                    <Badge className="mt-3" variant="secondary">
                        {account?.status}
                    </Badge>
                </div>

                <Separator className="my-6"/>

                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground"/>
                        <span>{account?.pessoa_info?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground"/>
                        <span>{account?.pessoa_info?.telefone}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground"/>
                        <span>{account?.pessoa_info?.concelho + ', ' + account?.pessoa_info?.naturalidade}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}