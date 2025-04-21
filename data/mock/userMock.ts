import { piscinaPrincipal, piscinas, piscinaSecundaria } from "./piscinaMock";

const leo : User = {
    id: 1,
    name: 'Leo',
    email: 'leo@unique.com',
    piscinas: piscinas,
};

const gabi : User = {
    id: 2,
    name: 'Gabriel',
    email: 'gabi@unique.com',
    piscinas: [],
};

const seba : User = {
    id: 3,
    name: 'Sebastian',
    email: 'seba@unique.com',
    piscinas: [piscinaPrincipal, piscinaSecundaria],
};

const diego : User = {
    id: 4,
    name: 'Diego',
    email: 'diego@unique.com',
    piscinas: [piscinaPrincipal]
};

export { leo, gabi, seba, diego };