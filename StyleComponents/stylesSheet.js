import styled from 'styled-components/native';
import { keyframes } from 'styled-components';
export const Cont = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export const Card = styled.View`
    background-color: #fff;
    width: 80%;
    height: 480px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border: 1px solid #c9c9c9;
    align-items: center;
    elevation:9;
    shadowColor: "grey";
    shadowOpacity: 0.7;
    shadowRadius: 100px;
    margin-bottom: 25px;
    margin-top: 25px;
`;

export const Header = styled.View`
    width: 100%;
    height: 220px;
    align-items: center;
    border-radius: 50%;
`;

export const Fotter = styled.View`
    width: 100%;
    height: 280px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    border-top-style: solid;
    border-color: #c9c9c9;
    border-top-width: 1px;
    margin-top: 20px;
`;

export const Name = styled.View`
    width: 100%;
    height: 20%;
    margin-top: 10px;
    align-items: center;
    justify-content: center;
`;

export const Desc = styled.View`
    width: 100%;
    height: 20%;
    margin-top: 5px;
    align-items: center;
    padding: 5px;
    text-align: center;
    justify-content: center;

    
`;

export const Prize = styled.View`
    width: 100%;
    height: 15%;
    align-items: center;
    justify-content: center;
    background-color: #556b2f;
    bottom: 0px;
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    position: absolute;
`;

export const Buy = styled.View`
    width: 100%;
    height: 20%;
    position: absolute;
    background-color: #000;
    bottom: 0;

`;

export const Nav = styled.View`
    width: 100%;
    height: 90px;
    background-color: #556b2f;
    border-bottom-style: solid;
    border-color: #c9c9c9;
    border-bottom-width: 1px;
    elevation:90;
    shadowColor: "black";
    shadowOpacity: 1;
    shadowRadius: 100px;
    
`;


export const Search = styled.TextInput`
    width: 80%;
    height: 25px;
    background-color: #fff;
    border-radius: 3px;
    padding-left: 4px;
`;

export const CartIcon = styled.TouchableOpacity`
    width: 30px;
    height: 30px;
    position: absolute;
    right: 10px;
    bottom: 10px;
`;

export const Lupa = styled.View`
    width: 10%;
    height: 100%;
    position: absolute;
    right: 8%;

`;

export const Profile = styled.View`
    width: 100%;
    height: 12%;
    background-color: "#000";
    z-index: 999;
    opacity: 1;
    position: relative;
    border: 1px solid #c9c9c9;
    margin-bottom: 5px;
    border-radius: 2px;

`;

export const ProfileImage = styled.View`
    width: 30%;
    height: 100%;
    z-index: 999;
    opacity: 1;
    margin-left: 5px;
    border: 1px solid #000;
    top: 0;
`;

export const NameUser = styled.View`
    width: 63%;
    height: 50%;
    position: absolute;
    z-index: 999;
    opacity: 1;
    margin-left: 5px;
    right: 0px;
`;

export const Linked = styled.TouchableOpacity`
    width: 100%;
    height: 5%;
    border: 1px solid #c9c9c9;
    align-content: center;
    text-align: center;
    align-items: center;
    margin-top: 5px;
    background-color: "#000";


`;