import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

import { page_styles } from '../pages.js';
import card_styles from '../pages/cardStyle.js';
import common_styles from '../components/commonStyle.js';

import { useListChallenges } from '../modules/challenges/hooks.js';
import { FullChallengeDisplay, SingleChallengeDisplay } from '../components/challenge-display.js';


function ChallengeBoard(props) {
  let {perpage, page} = props.route.params ? props.route.params : {
    perpage: undefined, page: undefined 
  }
  const challengeQuery = useListChallenges(
    {perPage: perpage, page: page}
  );
  if (challengeQuery.status !== 'success') {
    return (<Text> Challenges Loading... </Text>);
  }
  return (
    <>
      {challengeQuery.data.map(
        challenge => (<SingleChallengeDisplay challenge={challenge} key={challenge._id}/>)
      )}
    </>
  );
}

export function ChallengePage(props) {
  return (
    <View style={page_styles.app_scrollview}>
      { props.route.params && props.route.params.id
        ? <FullChallengeDisplay challengeId={props.route.params.id}/>
        : <ChallengeBoard {...props}/>
      }
    </View>
  );
}


const styles = StyleSheet.create({
  ...card_styles,
  ...common_styles,
  ...{
  },
});
