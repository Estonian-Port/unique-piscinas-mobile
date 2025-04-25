import { piscinaPrincipal, piscinas, piscinaSecundaria } from "./piscinaMock";

const leo : User = {
    id: 1,
    name: 'Leo',
    lastname: 'Rodriguez',
    email: 'leo@unique.com',
    piscinas: piscinas,
};

const gabi : User = {
    id: 2,
    name: 'Gabriel',
    lastname: 'Tarquini',
    email: 'gabi@unique.com',
    piscinas: [],
};

const seba : User = {
    id: 3,
    name: 'Sebastian',
    lastname: 'Rodriguez',
    email: 'seba@unique.com',
    piscinas: [piscinaPrincipal, piscinaSecundaria],
};

const diego : User = {
    id: 4,
    name: 'Diego',
    lastname: 'Maradona',
    email: 'diego@unique.com',
    piscinas: [piscinaPrincipal]
};

export { leo, gabi, seba, diego };