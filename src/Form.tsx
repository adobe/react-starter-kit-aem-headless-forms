/*
Copyright 2022 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import React, {useEffect, useState} from "react";
import {AdaptiveForm} from "@aemforms/af-react-renderer";
import customMappings from './utils/mappings';
import ReactDOM from "react-dom";
import {Action} from "@aemforms/af-core";
//@ts-ignore
import {Provider as Spectrum3Provider, defaultTheme} from '@adobe/react-spectrum'
import localFormJson from '../form-definations/form-model.json';

const getForm = async () => {
  if (process.env.USE_LOCAL_JSON == 'true') {
    return localFormJson;
  } else {
    let formAPI = process.env.FORM_API;
    // check for null or empty string
    if (!formAPI) {
        const SUFFIX = "jcr:content/guideContainer.model.json";
        const formPath = process.env.AEM_FORM_PATH
        formAPI = `${formPath}/${SUFFIX}`;
    }
    const resp = await fetch(formAPI);
    return (await resp.json());
  }
}

const Form = (props: any) => {
    const [form, setForm] = useState("")
    const fetchForm = async () => {
        const json:any = await getForm();
        if ('afModelDefinition' in json) {
            setForm(JSON.stringify(json.afModelDefinition))
        } else {
            setForm(JSON.stringify(json))
        }
    }
    const onSubmit= (action: Action) => {
      console.log('Submitting ' + action);
      const thankyouPage =  action?.payload?.redirectUrl;
      const thankYouMessage = action?.payload?.thankYouMessage;
      if(thankyouPage){
        window.location.replace(thankyouPage);
      }else if(thankYouMessage){
        alert(thankYouMessage);
      }
    };

    const onInitialize = (action:Action) => {
      console.log('Initializing Form');
    };

    const onFieldChanged = (action: Action) => {
      console.log('On Field Changed (Executes everytime a form field is updated)')
    };

    useEffect(() => {
        fetchForm()
    }, []);
    if (form != "") {
        const element = document.querySelector(".cmp-formcontainer__content")
        const retVal = (<Spectrum3Provider theme={defaultTheme}>
            <AdaptiveForm formJson={JSON.parse(form)} mappings={customMappings} onInitialize={onInitialize} onFieldChanged={onFieldChanged} onSubmit={onSubmit}/>
        </Spectrum3Provider>)
        return ReactDOM.createPortal(retVal, element)
    }
    return null
}

export default Form