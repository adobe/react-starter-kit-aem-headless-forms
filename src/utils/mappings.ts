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
import { mappings } from "@aemforms/af-react-vanilla-components";

const customMappings: any = {
  ...mappings,
  "forms-components-examples/components/form/wizard": mappings["core/fd/components/form/wizard/v1/wizard"],
  "forms-components-examples/components/form/accordion": mappings["core/fd/components/form/accordion/v1/accordion"],
  "forms-components-examples/components/form/tabsontop": mappings["core/fd/components/form/tabsontop/v1/tabsontop"],
  "forms-components-examples/components/form/verticaltabs": mappings["core/fd/components/form/verticaltabs/v1/verticaltabs"],
  "forms-components-examples/components/form/panelcontainer": mappings["core/fd/components/form/panelcontainer/v1/panelcontainer"]

};

export default customMappings;