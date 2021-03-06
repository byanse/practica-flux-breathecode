import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";
import * as actions from "../actions/actions";
import store from "../stores/store";

export default class Contacts extends Flux.DashView  {
    constructor(){
        super();
        this.state = {
            full_name: "",
            mode : 'add'

        };
    }
    componentDidMount(){
        if(typeof this.props.match.params.id !== 'undefined'){
            const contacts = store.getState('contacts');
            const contact = contacts.find((c) => c.id == this.props.match.params.id);
            this.setState({mode: 'edit', full_name: contact.full_name, id: contact.id});
        }
        this.subscribe(store, "contacts", (contacts) =>{
                this.props.history.push("/");
        });
    }
    render() {
        return (
            <div className="container">
                <div>
                    <h1 className="text-center mt-5">Add a new contact</h1>
                    <form>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" className="form-control" placeholder="Full Name" onChange={(e) => this.setState ({
                                full_name: e.target.value
                            })} 
                            value={this.state.full_name}
                            
                            />
                        </div>
                        <button type="button"
                         className="btn btn-primary
                         form-control"
                         onClick={()=> {
                            if(this.state.mode == 'add') actions.addContact({
                                full_name: this.state.full_name
                         });
                         else if(this.state.mode == 'edit') actions.editContact({
                            full_name: this.state.full_name, id: this.state.id
                     });
                    
                        
                        }
                         >save</button>
                        <Link className="mt-3 w-100 text-center" to="/">or get back to contacts</Link>
                    </form>
                </div>
            </div>
        );
    }
}