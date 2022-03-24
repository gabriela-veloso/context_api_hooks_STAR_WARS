import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SWContext from './SWContext';

const INITIAL_COLUMNS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function SWProvider({ children }) {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [filters, setFilters] = useState({
    filterByName: '',
    filterByNumericValues: [{
      column: 'population',
      comparison: 'maior que',
      value: '' }] });
  const [columns, setColumns] = useState(INITIAL_COLUMNS);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const newData = await (await fetch('https://swapi-trybe.herokuapp.com/api/planets/')).json();
      setData(newData.results); // atualizei meu estado com um array vindo da API
      setFiltered(newData.results); // setando um estado inicial para os filtrados
      setIsLoading(false);
    } catch (error) {
      setErrorMsg(error);
      console.log(errorMsg);
    }
  };

  const filterBy = (column, comparison, value) => {
    setFilters({
      ...filters, // copia o objeto filters todo
      filterByNumericValues: // e adiciona na chave filterByNumericValues
      [...filters.filterByNumericValues, { column, comparison, value }],
    }); // um o antigo de filterByNumericValues e o novo de filterByNumericValues
  };

  const filterInput = (name) => {
    if (name.length === 0) {
      setFiltered(data);
    } else {
      const inputName = data.filter((p) => (
        (p.name).toLowerCase()).includes(name.toLowerCase()));
      setFiltered(inputName);
    }
    setFilters({ filterByName: name });
  };

  const filterColumn = () => {
    // REQUISITO 4
    const numFilterOptions = filters.filterByNumericValues
      .reduce((accArr, numFilter) => {
        accArr.push(numFilter.column);
        return accArr;
      }, []);
    console.log(numFilterOptions);

    const filteredColumns = columns.filter((col) => (
      !numFilterOptions.includes(col)));
    setColumns(filteredColumns);
  };

  const filterData = (column, comparison, value) => {
    switch (comparison) {
    case 'menor que':
      setFiltered(data.filter((p) => Number(p[column])
        < Number(value)));
      break;
    case 'maior que':
      setFiltered(data.filter((p) => Number(p[column])
        > Number(value)));
      break;
    case 'igual a':
      setFiltered(data.filter((p) => Number(p[column])
        === Number(value)));
      break;
    default:
      break;
    }
    setFilters({ ...filters,
      filterByNumericValues:
      [...filters.filterByNumericValues, { column, value, comparison }] });
    filterColumn();
  };

  return (
    <SWContext.Provider
      value={
        {
          columns,
          setColumns,
          filtered,
          setFiltered,
          isLoading,
          fetchData,
          filters,
          setFilters,
          filterData,
          filterInput,
          filterBy }
      }
    >
      {children}
    </SWContext.Provider>
  );
}

SWProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SWProvider;
