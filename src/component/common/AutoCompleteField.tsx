import { useEffect, useState } from "react";
import { Form, Input, InputProps, SemanticWIDTHS } from "semantic-ui-react";
import "./css/AutoCompleteFIeld.css";

type prop = {
    lists: string[],
    label?: string,
    width: SemanticWIDTHS,
    inputProp: InputProps,
    value: string,
    onListClick: (e: any) => void
    setValue: React.Dispatch<React.SetStateAction<string>>,
    preAutoComplete?: () => void
    postAutoComplete?: () => void
}


const AutoCompleteField: React.FC<prop> = (prop: prop) => {

    const [options, setOptions] = useState<string[]>(prop.lists);
    const [forcus, setForcus] = useState<boolean>(false);

    const autoComplete = (inputStr: string) => {
        let pattern: RegExp = new RegExp(`^${inputStr.replace(/[.*+?^=!:${}()|[\]\/\\]/g, '\\$&').trim()}.*`)
        setOptions(prop.lists.filter(o => pattern.test(o)))
    };

    const [lists, setLists] = useState<JSX.Element>();

    useEffect(() => {
        if (forcus && options.length !== 0) {
            setLists(
                <ul className={'autocomplete-ul'}
                    onClick={(e: any) => {
                        prop.onListClick(e)
                    }
                    }>
                    {options.map((o, index) => <li key={index}>{o}</li>)}
                </ul>
            )

        } else {
            setLists(undefined);
        }
    }, [options, forcus])

    useEffect(() => {
        autoComplete(prop.value);
    }, [prop.value, prop.lists])

    const onBlur = () => {
        setForcus(false)
        document.body.removeEventListener('click', onBlur)
    }

    return (
        <Form.Field style={{ "margin": "0px", "position": "relative" }} width={prop.width}>
            <Input
                label={prop.label}
                {...prop.inputProp}
                value={prop.value}
                onChange={(e, data) => {
                    prop.setValue(data.value);
                }}
                onFocus={() => setForcus(true)}

                /*
               *  各要素のonclickが先に発火されるように直接setStateを呼び出すのでなく
               *  bodyにeventlistnerを登録する
               */
                onBlur={() => document.body.addEventListener('click', onBlur)
                }
            />
            {lists}
        </Form.Field>
    )
}

export default AutoCompleteField;