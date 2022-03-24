import React, { useContext, useEffect, useState } from 'react';
import SWContext from '../context/SWContext';

function Form() {
  const {
    fetchData,
    filterData,
    filterInput,
    columns,
  } = useContext(SWContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  useEffect(() => fetchData, []);

  const onButtonClick = () => {
    filterData(column, comparison, value);
  };

  return (
    <div>
      <div>
        <input
          data-testid="name-filter"
          name="planet"
          placeholder="Filtrar por nome"
          onChange={ (e) => filterInput(e.target.value) }
        />
      </div>
      <select
        name="column"
        data-testid="column-filter"
        onChange={ (e) => setColumn(e.target.value) }
      >
        {columns.map(
          (c) => <option name={ c } key={ c } value={ c }>{ c }</option>,
        )}
      </select>
      <select
        name="comparison"
        data-testid="comparison-filter"
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        type="number"
        data-testid="value-filter"
        name="value"
        value={ value }
        onChange={ (e) => setValue(e.target.value) }
      />
      <button
        type="submit"
        data-testid="button-filter"
        onClick={ onButtonClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Form;
