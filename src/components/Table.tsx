import {
  TableRow
} from './../models/Database';
import Element from './Element';
import { InputType } from './FormInput';

// Create a union type of all possible table row types


type TableProps = {
  head: string[];
  body: TableRow[];
  inputType:InputType[];
}

export default function Table({ head, body, inputType }: TableProps) {
  const bodyElements = body.map((element, index) => {
    // Use index as fallback key if element.id is not available
    const key = 'id' in element ? element.id : index;
    
    return (
      <Element
        key={key} 
        head={head}  
        element={element}
        inputType={inputType}
      />
    );
  });

  return (
      <div className="w-full overflow-x-auto">
      <table className="min-w-[500px] border border-gray-200">
        <thead>
          <tr>
            {head.map((header, index) => (
              <th key={index} className="px-4 py-2 whitespace-nowrap text-left">
                {header}
              </th>
            ))}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bodyElements}
        </tbody>
      </table>
  </div>

  );
}