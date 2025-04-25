import FAQ from "@/app/(tabs)/faq"

const faq1: FAQ = {
    question: "¿Qué es el sistema de filtración de la piscina?",
    answer: "El sistema de filtración es un conjunto de equipos que eliminan impurezas y contaminantes del agua de la piscina, asegurando su limpieza y claridad."
};

const faq2: FAQ = {
    question: "¿Con qué frecuencia debo limpiar el filtro?",
    answer: "La limpieza del filtro depende del uso de la piscina, pero generalmente se recomienda hacerlo cada 4-6 semanas."
};

const faq3: FAQ = {
    question: "¿Qué tipo de productos químicos debo usar en el agua de la piscina?",
    answer: "Es importante usar productos químicos específicos para piscinas, como cloro, alguicidas y reguladores de pH, para mantener el agua en condiciones óptimas."
};

const faq4: FAQ = {
    question: "¿Cómo puedo saber si el agua de la piscina está equilibrada?",
    answer: "Puedes usar un kit de prueba de agua para medir los niveles de pH, cloro y alcalinidad. Los niveles ideales son: pH entre 7.2 y 7.6, cloro entre 1 y 3 ppm y alcalinidad entre 80 y 120 ppm."
};

export const faqsMock: FAQ[] = [
    faq1,
    faq2,
    faq3,
    faq4,
];