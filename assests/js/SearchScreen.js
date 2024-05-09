import React, { Component } from 'react';
import { View, Text, Button, Alert, ScrollView } from 'react-native';
import ingredientsData from '../json/ingredients.json';
import CheckBox from '@react-native-community/checkbox';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            allergy: '',
            
        };
        this.loadUserInfoFromProps = this.loadUserInfoFromProps.bind(this);
    }

    loadUserInfoFromProps(){
        this.setState({ firstname: this.props.user_info.firstname });
        this.setState({ lastname: this.props.user_info.lastname });
        this.setState({ allergy: this.props.user_info.allergy });
    }

    render() {
        if(this.state.firstname == ''){
            this.loadUserInfoFromProps()
        }
        
        return (
            <View>
                <Text>Prénom: {this.state.firstname}</Text>
                <Text>Nom: {this.state.lastname}</Text>
                <Text>Allergie: {this.state.allergy}</Text>
            </View>
        );
    }
}

class Ingredient extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isChecked: false,
        id: props.id
      };
    }
  
    toggleCheckbox = () => {
      this.setState(prevState => ({
        isChecked: !prevState.isChecked,
      }));
    };
  
    render() {
      const { id, name } = this.props;
      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox
            value={this.state.isChecked}
            onValueChange={this.toggleCheckbox}
          />
          <Text>Name: {name}</Text>
        </View>
      );
    }
  }

class ListeIngredient extends Component {
    render() {
      return (
        <ScrollView>
        {Object.entries(ingredientsData[0]).map(([name, id], index) => {
          return <Ingredient key={index} id={id} name={name} />;
        })}
        </ScrollView>
      );
    }
  }

class SearchScreen extends Component {
    render() {
        const { navigation, route } = this.props;
        const userInfo = route.params?.user_info || {};
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <UserInfo user_info={userInfo}/>
                <ListeIngredient/>
                <Button
                    title="Go to Home"
                    onPress={() => navigation.navigate('Home')}
                />
            </View>
        );
    }
}

export default SearchScreen;
