import React, { Component } from 'react';
import List from './List'
import './App.css';
import STORE from './STORE';


const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}



class App extends Component {

  state = {
    store: STORE,
  }

  

  handleDeleteCard = (cardId) => {
    // console.log('attempting to delete ' ,cardId)
    const { lists, allCards } = this.state.store

    console.log(lists)

    const newList = lists.map(list => {
      list.cardIds = list.cardIds.filter(id => id !== cardId);
      return list;
    })

    delete allCards[cardId];

    this.setState({
      store: {
        lists: newList,
        allCards
      }
    })
  }

  handleAddedCard = (listId) => {
    const newCard = newRandomCard()

    const newLists = this.state.store.lists.map(list => {
      if(list.id === listId) {
        list.cardIds.push(newCard.id)
      }
      return list
    })

    this.setState({
      store: {
        lists: newLists,
        allCards: {
          ...this.state.store.allCards,
          [newCard.id]: newCard
        }
      }
    })
  }

  render() {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              onClickDelete={this.handleDeleteCard}
              onClickAddCard={this.handleAddedCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;
