export interface NewsAttributes {
    id?: number;
    titulo: string;
    descripcion: string;
    imagen: string | null;
    fechaPublicacion: Date;
    activo: boolean;
}
