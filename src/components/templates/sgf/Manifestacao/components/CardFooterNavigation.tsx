import {Button} from "@/components/atoms/button"
import {LoaderCircle} from "lucide-react"

interface CardFooterProps {
    isFirstTab: boolean
    isLastTab: boolean
    onNext: () => void
    onPrevious: () => void
    isSubmitting?: boolean
}

export function CardFooterNavigation(props: CardFooterProps) {

    const {isSubmitting, onNext, isFirstTab, isLastTab, onPrevious} = props

    return (
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-4">

            {!isFirstTab && (
                <Button
                    type="button"
                    variant="outline"
                    onClick={onPrevious}
                >
                    Anterior
                </Button>
            )}

            {!isLastTab && (
                <Button
                    type="button"
                    onClick={onNext}
                >
                    Seguinte
                </Button>
            )}

            {isLastTab && (
                <Button type="submit">

                    {isSubmitting
                        ? (
                            <div className="flex gap-2">
                                <LoaderCircle className="h-4 w-4 animate-spin"/>
                                <span>Processando...</span>
                            </div>
                        )
                        : "Submeter"
                    }

                </Button>
            )}

        </div>
    )
}