export interface Task {
  id: number;
  titulo: string;
  categoria: string;
  responsavelNome: string;
  concluida: boolean;
  dataConclusao: string | null;
}