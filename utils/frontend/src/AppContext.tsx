import { typeBreadcumbProps } from "@/interfaces/externals/breadcumb";
import { typeUserAuthed } from "@/interfaces/externals/userAuthed";
import { typeDataBookLists } from "@/interfaces/internals/dataBookLists";
import React, { Dispatch, SetStateAction } from "react";


interface typeContextProps {
    UserAuthed: typeUserAuthed;
    setUserAuthed: Dispatch<SetStateAction<typeUserAuthed>>;
    StatusCode: number;
    setStatusCode: Dispatch<SetStateAction<number>>;
    BreadcumbValue: typeBreadcumbProps;
    setBreadcumbValue: Dispatch<SetStateAction<typeBreadcumbProps>>;
}

interface customTypeContextProps {
    DataBookLists: typeDataBookLists,
    setDataBookLists: Dispatch<SetStateAction<any>>;
}

export const AppContext = React.createContext<typeContextProps & customTypeContextProps>({
    UserAuthed: {},
    setUserAuthed: () => { },
    StatusCode: 202,
    setStatusCode: () => { },
    BreadcumbValue: [],
    setBreadcumbValue: () => { },
    DataBookLists: [],
    setDataBookLists: () => { }
});