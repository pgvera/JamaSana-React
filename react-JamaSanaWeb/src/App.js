import logo from './logo.svg';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, FormGroup, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';

const datos = [
  {id: 1, categoria:"Comida China", img: "https://img.vixdata.io/pd/jpg-large/es/sites/default/files/imj/otramedicina/B/Beneficios-de-la-cocina-medicinal-china-2.jpg"},
  {id:2, categoria:"Comida Italiana", img: "https://www.animalgourmet.com/wp-content/uploads/2019/05/spaghetti-3547078_1920-e1578933714229.jpg" },
  {id:3, categoria:"Comida Ecuatoriana", img: "https://www.rebeccaadventuretravel.com/wp-content/uploads/2018/03/Fanesca.jpg"}
];

class App extends React.Component {
  state={
    datos:datos,
    form:{
      id:"",
      categoria:"",
      img:""
    },
    modalInsertar: false,
    modalEditar:false,
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  mostrarModal=()=>{
    this.setState({modalInsertar:true,});
  }

  ocultarModal=()=>{
    this.setState({modalInsertar:false,});
  }

  mostrarModalE=(data)=>{
    this.setState({modalEditar:true, form: data});
  }

  ocultarModalE=()=>{
    this.setState({modalEditar:false,});
  }

  insertar=()=>{
    var nuevo ={...this.state.form};
    nuevo.id=this.state.datos.length+1;
    var list = this.state.datos;
    console.log(nuevo);
    list.push(nuevo);
    this.setState({datos: list, modalInsertar: false});
  }

  editar=(data)=>{
    var num = 0;
    var list = this.state.datos;
    list.map((cat)=>{
      if(data.id==cat.id){
        list[num].categoria=data.categoria;
        list[num].img=data.img;
      }
      num++;
    });
    this.setState({datos:list, modalEditar: false});

  }

  eliminar=(dato)=>{
    var preg = window.confirm("Quiere eliminar la categoria "+dato.categoria);
    if(preg){
      var num=0;
      var list = this.state.datos;
      list.map((cat)=>{
        if(cat.id==dato.id){
          list.splice(num,1);
        }
        num++;
      });
      this.setState({datos:list});
    }

  }

  render() {return (
    <div id="divcat" className="App">
      <header className="App-header">
       
      </header>
      <h1>Categorias</h1>
      <body>
        <Container>
          <br />
          <Button id="add" onClick={()=>this.mostrarModal()}>Añadir nueva categoria</Button>
          <br />
          <Table id="tabla">
            <thead><tr><th>Id</th>
            <th>Nombre</th>
            <th>Imagen</th>
            <th>Editar</th></tr></thead>
            <tbody>
              {this.state.datos.map((cat)=>(
                
                <tr>
                  <td class="tdid">{cat.id}</td>
                  <td class="tdcat">{cat.categoria}</td>
                  <td class="tdim"><img src={cat.img} alt=""/></td>
                  <td class="buttons"><Button id="edit" color="primary" onClick={()=>this.mostrarModalE(cat)}>Editar</Button><Button id="delete" color="primary" onClick={()=>this.eliminar(cat)} >Eliminar</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>

          
        </Container>

        
        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader>
           <div><h3>Editar Categoria</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Categoria: 
              </label>
              <input
                className="form-control"
                name="categoria"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.categoria}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Imagen: 
              </label>
              <input
                className="form-control"
                name="img"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.img}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={()=>this.ocultarModalE()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>


        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Categoria</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.datos[this.state.datos.length-1].id+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Categoria: 
              </label>
              <input
                className="form-control"
                name="categoria"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Imagen: 
              </label>
              <input
                className="form-control"
                name="img"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary" onClick={()=>this.insertar()}
            >
              Insertar
            </Button>
            <Button className="btn btn-danger" onClick={() => this.ocultarModal()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </body>
    </div>
  );}
  
}

export default App;
