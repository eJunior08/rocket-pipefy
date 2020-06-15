import React, { useState } from 'react';
import produce from 'immer';

import BoardContext from './context';

import { loadLists } from "../../services/api";

/* Styles */
import { Container } from "./styles";

/* Components */
import List from '../List'

const data = loadLists();

export default function Board() {

  const [lists, setLists] = useState(data);

  function move(fromList, toList, from, to) {
    /* produce(info, copia)
     * produce recebe uma informação imutavel
     * copia é uma função que é a copia da info
     * produce vai computar na info a copia
     */
    setLists(produce(lists, draft => {
      console.log('fromList', fromList);
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }));
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => <List key={list.title} index={index} data={list} />)}
      </Container>
    </BoardContext.Provider>
  );
}
