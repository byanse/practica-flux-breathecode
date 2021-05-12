import React from "react";
import Flux from "@4geeksacademy/react-flux-dash";
import { Link } from "react-router-dom";

import ContactCard from '../components/ContactCard';
import Modal from '../components/Modal';
import avatar1 from '../../img/user_1.jpg';
import store from "../stores/store";
import * as actions from "../actions/store";


export default class Contacts extends Flux.DashView {
    constructor(){
        super();
        this.state = {
            contacts: [] 
        };
    }
    componentDidMount(){
        let contacts = store.getState("contacts");
        if(contacts) this.setState({
            contacts
        });
        this.subscribe(store, "contacts", (contacts) =>{
            this.setState({
                contacts
            });
        });
    }
    render() {
        const cards = this.state.contacts.map((c, i) => {
          return <ContactCard 
                    key={i} data={c}
                    onDelete={(contact) => actions.deleteContact(contact) }
                    />;
        });
        return (
            <div className="container">
                <div>
                    <p className="text-right my-3">
                        <Link className="btn btn-success" to="/add">Add new contact</Link>
                    </p>
                    <div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
                        <ul className="list-group pull-down" id="contact-list">
                            {cards}
                        </ul>
                    </div>
                </div>
                <Modal show={this.state.showModal} onClose={() => this.setState({showModal: false})} />
            </div>
        );
    }
}