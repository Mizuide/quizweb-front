import { ReactNode, useEffect, useRef, useState } from "react";
import { Form, Input, InputProps } from "semantic-ui-react";
import "./css/AutoCompleteFIeld.css";

type prop = {
    lists: string[],
    label?: string,
    inputProp: InputProps,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    preAutoComplete?: () => void
    postAutoComplete?: () => void
}


const AutoCompleteField: React.FC<prop> = (prop: prop) => {
    const [options, setOptions] = useState<string[]>(prop.lists);
    const [forcus, setForcus] = useState<boolean>(false);
    const autoComplete = (inputStr: string) => {
        let pattern: RegExp = new RegExp('^' + inputStr.trim() + '.*')
        setOptions(prop.lists.filter(o => pattern.test(o)))
    };

    const [lists, setLists] = useState<JSX.Element>();
    useEffect(() => {
        if (forcus) {
            setLists(
                <ul className={'autocomplete-ul'}
                    onClick={(e: any) => {
                        prop.setValue(e.target.innerText)
                    }
                    }>
                    {options.map((o, index) => <li key={index}>{o}</li>)}
                </ul>
            )

        } else {
            setLists(undefined);
        }
    }, [options, forcus])
    /*
    *  各要素のonclickが先に発火されるように直接setStateを呼び出すのでなく
    *  bodyにeventlistnerを登録する
    */
    const onBlur = () => {
        setForcus(false)
        document.body.removeEventListener('click', onBlur)
    }

    return (
        <Form.Group grouped widths={10} >
            <Form.Field style={{ "margin": "0px" }} width={10}>
                <label>{prop.label}</label>
                <Input
                    {...prop.inputProp}
                    value={prop.value}
                    onChange={(e, data) => {
                        prop.setValue(data.value);
                        if (prop.preAutoComplete)
                            prop.preAutoComplete();
                        autoComplete(data.value);
                        if (prop.preAutoComplete)
                            prop.preAutoComplete();
                    }}
                    onFocus={() => setForcus(true)}
                    onBlur={() => document.body.addEventListener('click', onBlur)
                    }
                />
            </Form.Field>
            <Form.Field style={{ "position": "absolute", "margin": "0px" }} width={10}>
                {lists}
            </Form.Field>
        </Form.Group >
    )
}

export default AutoCompleteField;