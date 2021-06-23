import VueI18n from "vue-i18n";

const defaultGetChoiceIndex = VueI18n.prototype.getChoiceIndex

/**
 * Pluralization works like this:
 * { apples: 'No apples | One apple | {n} apples'}
 * $t('apples', 0) => No apples
 * $t('apples', 1) => One apple
 * $t('apples', 123) => 123 apples
 * 
 * @param { number } choice a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
 * @param { number } choicesLength 
 * @param { string } locale this.locale from the VueI18n instance
 * @see http://kazupon.github.io/vue-i18n/guide/pluralization.html#custom-pluralization
 */
export default function getChoiceIndex(choice, choicesLength, locale = this.locale) {
  if (locale === 'pl') {
    return getChoiceIndexPolish(choice)
  }

  return defaultGetChoiceIndex.apply(this, arguments)
}

/**
 * Slavic languages like Polish have special pluralization rules
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals#Plural_rule_9_(3_forms)
 * 
 * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
 * @returns a final choice index to select plural word by
**/
function getChoiceIndexPolish(choice) {
  if (choice === 0 || choice === 1) {
    return 0;
  }

  const teen = choice > 10 && choice < 20;
  const endsWithTwo = choice % 10 === 2;
  const endsWithThree = choice % 10 === 3;
  const endsWithFour = choice % 10 === 4;

  if (!teen && (endsWithTwo || endsWithThree || endsWithFour)) {
    return 1;
  }

  return 2;
}