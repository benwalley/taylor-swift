import {atom} from "recoil";

export const EditingLyricLines = atom({
    key: 'EditingLyricLines',
    default: [{id: 0, content: ''}],
});
