import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {format, formatDistanceToNow, isValid, parseISO} from "date-fns";
import dayjs from "dayjs";
import {pt,} from 'date-fns/locale';

/*import "dayjs/locale/pt";
dayjs.locale("pt");*/

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function isISODate(str: string): boolean {
    return /^\d{4}-\d{2}-\d{2}(T|$)/.test(str);
}

export function formatarData(dataStr?: string, isTime?: boolean): string {
    if (!dataStr) return "";

    const data = isISODate(dataStr) ? parseISO(dataStr) : new Date(dataStr);

    if (!isValid(data)) return "";

    const dataFormatada = format(data, "dd-MM-yyyy");

    const dataFormt = format(data, "d 'de' MMM 'de' yyyy, HH:mm");

    const relativo = formatDistanceToNow(data, {
        addSuffix: true,
        locale: pt,
    });

    const resultado = `${dataFormt} (${relativo})`;

    return isTime ? resultado : dataFormatada;
}

export function getShortName(fullName?: string) {
    if (!fullName) return "";
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[parts.length - 1]}`;
}

export function buildQueryString(params: Record<string, any>): string {
    return Object.entries(params)
        .filter(([, value]) => value !== undefined)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
        )
        .join("&");
}

export function formatDate(
    date: string | null | undefined,
    options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
    }
): string {
    if (!date) return "";

    const parsedDate = dayjs(date);

    if (!parsedDate.isValid()) return "";

    return parsedDate.toDate().toLocaleDateString("pt-PT", options);
}

export function verificarJaCandidatado(
    ofertaId: number | string,
    candidaturas: any[]
) {
    return candidaturas.some((cand) =>
        cand.cursos?.some(
            (curso: any) =>
                Number(curso.qualifOfertaId) === Number(ofertaId)
        )
    );
}