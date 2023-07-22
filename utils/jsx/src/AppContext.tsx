import { typeBreadcumbValue } from "@/interfaces/breadcumb";
import { typeUserAuthed } from "@/interfaces/userAuthed";
import React, { Dispatch, SetStateAction } from "react";


interface ContextValue {
    UserAuthed: typeUserAuthed;
    setUserAuthed: Dispatch<SetStateAction<typeUserAuthed>>;
    StatusCode: number;
    setStatusCode: Dispatch<SetStateAction<number>>;
    BreadcumbValue: typeBreadcumbValue;
    setBreadcumbValue: Dispatch<SetStateAction<typeBreadcumbValue>>;
}

export const AppContext = React.createContext<ContextValue>({
    UserAuthed: {},
    setUserAuthed: () => { },
    StatusCode: 202,
    setStatusCode: () => { },
    BreadcumbValue: [],
    setBreadcumbValue: () => { },
});