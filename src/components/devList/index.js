import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import { Creators } from '../../store/reducers/developer/index';
import { ContainerGroup } from './style';


export default function DevList() {
    const developers = useSelector(state => state.Developers.data);
    const dispatch = useDispatch();

    return (
        <>
            <ContainerGroup>
                <ListGroup className="ListGroupConteinerInformations" variant="flush">
                    {developers && developers.map(item => (
                        <div key={item.id}>
                            <ListGroup.Item className="ListGroupItemInformations" >
                                <div>
                                    <img src={item.avatar} />
                                </div>
                                <div className="informations" >
                                    <p className="nome" ><b>{!!item.nome ? item.nome : "Nome não informado"}</b></p>
                                    <p>{item.login}</p>
                                </div>
                                <FontAwesomeIcon className="iconDelete" 
                                    onClick={() => dispatch(Creators.RemoveDeveloper(item.id))} 
                                    icon={faTrashAlt} 
                                />
                            </ListGroup.Item>
                        </div>
                    ))}
                </ListGroup>
            </ContainerGroup>
        </>
    );
}