export type TodoType = {
  id: number;
  documentId: string;
  title: string;
  isCompleted: boolean;
  subtodos: SubTodoType[];
};

export interface SubTodoType {
  id: number;
  documentId: string;
  title: string;
  isCompleted: boolean;
}
