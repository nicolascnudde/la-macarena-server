import { Session } from './types';

export const isAdmin = ({ session }: { session: Session }) => session?.data.isAdmin;
export const isNotAdmin = ({ session }: { session: Session }) => session?.data.isAdmin === false;
export const isEditor = ({ session }: { session: Session }) => session?.data.isAdmin || session?.data.isEditor;
export const isAdminOrEditor = ({ session }: { session: Session }) => session?.data.isAdmin || session?.data.isEditor;
export const isNotAdminOrEditor = ({ session }: { session: Session }) => session?.data.isAdmin === false || session?.data.isEditor === false;
