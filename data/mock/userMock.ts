import { piscinaPrincipal, piscinas, piscinaSecundaria } from "./piscinaMock";

const leo : User = {
    id: 1,
    name: 'Leo',
    lastname: 'Rodriguez',
    email: 'leo@unique.com',
    piscinas: piscinas,
    isAdmin: true,
};

const gabi : User = {
    id: 2,
    name: 'Gabriel',
    lastname: 'Tarquini',
    email: 'gabi@unique.com',
    piscinas: [],
    isAdmin: false,
};

const seba : User = {
    id: 3,
    name: 'Sebastian',
    lastname: 'Rodriguez',
    email: 'seba@unique.com',
    piscinas: [piscinaPrincipal, piscinaSecundaria],
    isAdmin: false,
};

const diego : User = {
    id: 4,
    name: 'Diego',
    lastname: 'Maradona',
    email: 'diego@unique.com',
    piscinas: [piscinaPrincipal],
    isAdmin: false,
};

export { leo, gabi, seba, diego };