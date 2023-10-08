import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';

function ShelfPage() {
  const [shelfList, setShelfList] = useState([]);
  const [itemName, setItemName] = useState('');
  const [urlName, setUrlName] = useState('');

  useEffect(() => {
    fetchShelf();
  }, []);

  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  const addItem = (event) => {
    event.preventDefault();
    axios.post('api/shelf', { description: itemName, image_url: urlName})
    .then(response => fetchShelf())
    .catch( error => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  // const deleteItem = (id) => {
  //   axios.delete(`/api/shelf${id}`)
  //   .then((response) => {
  //     console.log(response);
  //     fetchShelf();
  //   })
  //   .catch (error => {
  //     console.log(error);
  //   });
  // }

  const deleteItem = (itemId) => {
    axios
      .delete(`/api/shelf/${itemId}`)
      .then((response) => {
        fetchShelf();
      })
      .catch((error) => {
        console.error(error);
        alert("Something went wrong while deleting the item.");
      });
  };

  return (
    <div className="container">
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      <form onSubmit={addItem}>
        Name: <input type="text" value={itemName} onChange={event => setItemName(event.target.value)} />
        Image URL: <input type="text" value={urlName} onChange={event => setUrlName(event.target.value)} />
        <br></br>
        <button>Submit</button>
      </form>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                        <button onClick={() => deleteItem(item.id)} style={{ cursor: "pointer" }}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
