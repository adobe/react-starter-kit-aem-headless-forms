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
import localFormJson from '../form-definitions/form-model.json';
import '@aemforms/af-canvas-theme/dist/theme.css';
import {FunctionRuntime} from '@aemforms/af-core';
//@ts-ignore
import * as customfunctions from '@aemforms/af-custom-functions';


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
    const formModel = await resp.json();
    const id = formModel.id;
    if (id) {
      // Retrieve prefill parameters from the current browser context
      const urlParams = new URLSearchParams(window.location.search);
      const prefillAPI = `/adobe/forms/af/data/${id}?${urlParams.toString()}`;

      try {
          const prefillResp = await fetch(prefillAPI, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
              credentials: 'include'
          });

          if (prefillResp.ok) {
              const prefillData = await prefillResp.json();
              if (prefillData) {
                  formModel.data = prefillData?.data;
              }
          } else {
              console.info(`Failed to fetch prefill data: ${prefillResp.statusText}`);
          }
      } catch (error) {
          console.info(`Error fetching prefill data: ${error.message}`);
      }
    }
    return formModel;
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
    const onSubmitSuccess= (action: Action) => {
      console.log('Submitting ' + action);
      const thankyouPage =  action?.payload?.body?.redirectUrl;
      const thankYouMessage = action?.payload?.body?.thankYouMessage;
      if(thankyouPage){
        window.location.replace(thankyouPage);
      }else if(thankYouMessage){
        alert(thankYouMessage);
      }
    };

    const onSubmitError= (action: Action) => {
      alert("Encountered an internal error while submitting the form.");
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
        // Register all custom functions with FunctionRuntime
        FunctionRuntime.registerFunctions({ ...customfunctions });
        const element = document.querySelector(".cmp-formcontainer__content")
        const retVal = (<AdaptiveForm formJson={JSON.parse(form)} mappings={customMappings} onInitialize={onInitialize} onFieldChanged={onFieldChanged} onSubmitSuccess={onSubmitSuccess} onSubmitError={onSubmitError} onSubmitFailure={onSubmitError}/>)
        return ReactDOM.createPortal(retVal, element)
    }
    return null
}

export default Form