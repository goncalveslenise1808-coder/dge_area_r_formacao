export const navigationByProfile = {
    jovem: [
        /* {
           title: "Dashboard",
           icon: "Home",
           href: "/",
         },*/
        {title: "Certificado", icon: "Award", href: "/certificado"},
        {
            title: "Solicitações",
            icon: "CheckCircle",
            items: [
                {
                    title: "Pedido Equivalência",
                    href: "/solicitacoes/pedido-equivalencia",
                },
                {title: "Acompanhamento", href: "/solicitacoes/acompanhamento"},
                {
                    title: "Certificação de Competências",
                    href: "/solicitacoes/certificado",
                },
            ],
        },
        {
            title: "Ofertas Formativas",
            icon: "BookOpen",
            items: [
                {title: "Consulta Ofertas", href: "/ofertas"},
                // { title: 'Lista Entidade Formadoras', href: '/entidades' },
                {title: "Minhas Candidaturas", href: "/candidaturas"},
            ],
        },
        {
            title: "Minha Formação",
            icon: "GraduationCap",
            items: [
                {title: "Programa Formativa", href: "/minha-formacao"},
                {title: "Lista de Ausência", href: "/ausencias"},
                {title: "Pauta", href: "/pauta"},
                {title: "Upload de Relatórios", href: "/relatorios"},
                {title: "Avaliação Geral", href: "/avaliacao"},
            ],
        },
        {
            title: "SGF",
            icon: "FileText",
            items: [
                {title: "Manifestação de Interesse", href: "/sgf/manifestacao"},
            ],
        },
        /*{
               title: 'Equivalência',
               icon: 'CheckCircle',
               items: [
                  /!* { title: 'Pedido', href: '/equivalencia/pedido' },*!/
                   /!*{ title: 'Acompanhamento', href: '/equivalencia/acompanhamento' },*!/
                   { title: 'Certificado', href: '/equivalencia/certificado' },
               ],
           },*/
        /* {
               title: 'RVCC',
               icon: 'Award',
               items: [
                   { title: 'Pedido', href: '/rvcc/pedido' },
                   { title: 'Acompanhamento', href: '/rvcc/acompanhamento' },
                   { title: 'Certificado', href: '/rvcc/certificado' },
               ],
           },*/
    ],

    formador: [
        {
            title: "Dashboard",
            icon: "Home",
            href: "",
        },
        {
            title: "SGF",
            icon: "FileText",
            items: [
                {title: "Manifestação de Interesse", href: "/sgf/manifestacao"},
                {title: "Acompanhamento", href: "/sgf/acompanhamento"},
                {title: "Histórico de Formação", href: "/sgf/historico"},
                {title: "Preferências do Formador", href: "/sgf/preferencias"},
                {title: "Ver Detalhes do Formador", href: "/sgf/detalhes"},
                //{ title: "CCF", href: "/sgf/caf" },
            ],
        },

        /* {
             title: 'CCF', icon: '', href: '',
             items: [
                 { title: 'Ver Certificado', href: '/ccf/certificado' },
             ]
         },*/

        /*{
            title: "Solicitações",
            icon: "CheckCircle",
            items: [
                {
                    title: "Pedido Equivalência Profissional",
                    href: "/solicitacoes/pedido-equivalencia-profissional",
                },
                {title: 'Pedido RVCC', href: '/solicitacoes/pedido-rvcc'},
                {
                    title: "Pedido Declaração/Certificado",
                    href: "/solicitacoes/pedido-declaracao-certificado",
                },
                {title: 'Acompanhamento', href: '/solicitacoes/acompanhamento'},
            ],
        },*/
        /*
                {title: 'Reclamação', icon: 'MessageSquareWarning', href: '/reclamacoes'},
        */
        {
            title: "Bolsa de Formadores",
            icon: "Users",
            items: [
                {title: "Ver ofertas de SGF", href: "/bolsa/ofertas"},
                {title: "Detalhes das Formações", href: "/bolsa/detalhes"},
            ],
        },
        {
            title: "Minhas Formações",
            icon: "BookOpen",
            items: [
                {title: "Formações Ativas", href: "/minhas-formacoes/ativas"},
                {title: "Histórico", href: "/minhas-formacoes/historico"},
                {title: "Avaliações Recebidas", href: "/minhas-formacoes/avaliacoes"},
            ],
        },

        /* {title: 'Gestão Financeiro', icon: 'DollarSign', href: '/gestao-financeiro'}*/
    ],

    entidade: [
        {
            title: "Dashboard",
            icon: "Home",
            href: "/",
        },
        {
            title: "SGF",
            icon: "Building2",
            items: [
                {title: "Criar Curso", href: "/sgf/criar-curso"},
                {title: "Criar Programa Formativa", href: "/sgf/criar-programa"},
                {title: "Avaliar Formandos", href: "/sgf/avaliar-formandos"},
            ],
        },
        {
            title: "Gestão de Cursos",
            icon: "BookOpen",
            items: [
                {title: "Meus Cursos", href: "/cursos"},
                {title: "Candidaturas Recebidas", href: "/candidaturas-recebidas"},
                {title: "Formandos Matriculados", href: "/formandos"},
            ],
        },
        {
            title: "Certificação RVCC",
            icon: "Award",
            items: [
                {
                    title: "Pedido Certificação RVCC",
                    href: "/rvcc-certificacao/pedido",
                },
                {title: "Alargamento", href: "/rvcc-certificacao/alargamento"},
                {title: "Renovação", href: "/rvcc-certificacao/renovacao"},
            ],
        },
        {
            title: "Relatórios",
            icon: "BarChart3",
            items: [
                {title: "Estatísticas", href: "/relatorios/estatisticas"},
                {title: "Relatórios Financeiros", href: "/relatorios/financeiros"},
            ],
        },
    ],
};