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
import React, {FC} from 'react';
import { useRuleEngine } from '@aemforms/af-react-renderer';

// Wrapper over useRuleEngine hook to interact with adaptive form sdk
export function withRuleEngine(Component: FC) {
  return function WrappedComponent(props: any) {
    const { isInEditor } = props;
    let convertedProps = { ...props };
    if (!isInEditor) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [state, handlers] = useRuleEngine(props);
      convertedProps = {
        ...convertedProps,
        ...state,
        handlers,
      };
    }
    const visible = typeof convertedProps.visible === 'undefined' || convertedProps.visible;
    return visible ? <Component {...convertedProps} /> : null;
  };
}