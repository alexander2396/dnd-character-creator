import React from 'react';
import logo from './logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
//import { degrees, PDFDocument, rgb, catalog, getMaybe, PDFName, PDFString, PDFNumber, PDFBool } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      race: '',
      class: '',
      background: '',
      level: 1,
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
      bonusStrength: '',
      bonusDexterity: '',
      bonusConstitution: '',
      bonusIntelligence: '',
      bonusWisdom: '',
      bonusCharisma: '',
      strengthEditable: '',
      dexterityEditable: '',
      constitutionEditable: '',
      intelligenceEditable: '',
      wisdomEditable: '',
      charismaEditable: '',
      alternativeHuman: false,
      acrobatics: false,
      animalHandling: false,
      arcana: false,
      athletics: false,
      deception: false,
      history: false,
      insight: false,
      intimidation: false,
      investigation: false,
      medicine: false,
      nature: false,
      perception: false,
      performance: false,
      persuasion: false,
      religion: false,
      sleightOfHand: false,
      stealth: false,
      survival: false
    }
  }

  handleSubmit() {
    this.generatePdf();
  }

  handleRaceChange(value) {
    this.setState({race: value});
    this.setState({bonusStrength: ''});
    this.setState({strengthEditable: false});
    this.setState({bonusDexterity: ''});
    this.setState({dexterityEditable: false});
    this.setState({bonusConstitution: ''});
    this.setState({constitutionEditable: false});
    this.setState({bonusIntelligence: ''});
    this.setState({intelligenceEditable: false});
    this.setState({bonusWisdom: ''});
    this.setState({wisdomEditable: false});
    this.setState({bonusCharisma: ''});
    this.setState({charismaEditable: false});

    switch (value) {
      case 'Дварф':
        this.setState({bonusConstitution: 2});
        break;
      case 'Эльф':
        this.setState({bonusDexterity: 2});
        break;
      case 'Полурослик':
        this.setState({bonusDexterity: 2});
        break;
      case 'Человек':
        this.setState({bonusStrength: 1});
        this.setState({bonusDexterity: 1});
        this.setState({bonusConstitution: 1});
        this.setState({bonusIntelligence: 1});
        this.setState({bonusWisdom: 1});
        this.setState({bonusCharisma: 1});
        break;
      case 'Драконорожденный':
        this.setState({bonusStrength: 2});
        this.setState({bonusCharisma: 1});
        break;
      case 'Гном':
        this.setState({bonusIntelligence: 2});
        break;
      case 'Полуэльф':
        this.setState({bonusCharisma: 2});
        this.setState({strengthEditable: true});
        this.setState({dexterityEditable: true});
        this.setState({constitutionEditable: true});
        this.setState({intelligenceEditable: true});
        this.setState({wisdomEditable: true});
        break;
      case 'Полуорк':
        this.setState({bonusStrength: 2});
        this.setState({bonusConstitution: 1});
        break;
      case 'Тифлинг':
        this.setState({bonusIntelligence: 1});
        this.setState({bonusCharisma: 1});
        break;
    }
  }

  clearSkills() {
    this.setState({
      acrobatics: false,
      animalHandling: false,
      arcana: false,
      athletics: false,
      deception: false,
      history: false,
      insight: false,
      intimidation: false,
      investigation: false,
      medicine: false,
      nature: false,
      perception: false,
      performance: false,
      persuasion: false,
      religion: false,
      sleightOfHand: false,
      stealth: false,
      survival: false
    });
  }

  handleClassChange(value) {
    this.setState({ class: value });

    this.clearSkills();

    if (this.state.background) {
      this.handleBackgroundChange(this.state.background);
    }
  }

  handleBackgroundChange(value) {
    this.setState({background: value});
    this.clearSkills();

    switch(value) {
      case 'Прислужник': this.setState({ insight: true, religion: true}); break;
      case 'Шарлатан': this.setState({ sleightOfHand: true, deception: true}); break;
      case 'Преступник': this.setState({ deception: true, stealth: true}); break;
      case 'Артист': this.setState({ acrobatics: true, performance: true}); break;
      case 'Народный герой': this.setState({ survival: true, animalHandling: true}); break;
      case 'Гильдейский ремесленник': this.setState({ insight: true, persuasion: true}); break;
      case 'Отшельник': this.setState({ medicine: true, religion: true}); break;
      case 'Благородный': this.setState({ history: true, persuasion: true}); break;
      case 'Чужеземец': this.setState({ athletics: true, survival: true}); break;
      case 'Мудрец': this.setState({ history: true, arcana: true}); break;
      case 'Моряк': this.setState({ athletics: true, perception: true}); break;
      case 'Солдат': this.setState({ athletics: true, intimidation: true}); break;
      case 'Безпризорник': this.setState({ sleightOfHand: true, stealth: true}); break;
    }
  }

  skillChange(skill) {
    this.setState((state) => {
      return {[skill]: !state[skill]};
    });
  }

  handleAlternativeHumanChange() {
    this.setState((state) => {
      return {alternativeHuman: !state.alternativeHuman};
    });
    
    if (!this.state.alternativeHuman) {
      this.setState({strengthEditable: true});
      this.setState({dexterityEditable: true});
      this.setState({constitutionEditable: true});
      this.setState({intelligenceEditable: true});
      this.setState({wisdomEditable: true});
      this.setState({charismaEditable: true});
      this.setState({bonusStrength: ''});
      this.setState({bonusDexterity: ''});
      this.setState({bonusConstitution: ''});
      this.setState({bonusIntelligence: ''});
      this.setState({bonusWisdom: ''});
      this.setState({bonusCharisma: ''});
    } else {
      this.setState({strengthEditable: false});
      this.setState({dexterityEditable: false});
      this.setState({constitutionEditable: false});
      this.setState({intelligenceEditable: false});
      this.setState({wisdomEditable: false});
      this.setState({charismaEditable: false});
      this.setState({bonusStrength: 1});
      this.setState({bonusDexterity: 1});
      this.setState({bonusConstitution: 1});
      this.setState({bonusIntelligence: 1});
      this.setState({bonusWisdom: 1});
      this.setState({bonusCharisma: 1});
    }
  }

  getSavethrow(param) {
    var value = 0;
    switch (param) {
      case 'strength':
        value = this.caclulateSkillValue('strength');
        if (['Воин', 'Монах', 'Следопыт', 'Варвар'].includes(this.state.class)) {
          value += 2;
        }
        break;
      case 'dexterity':
        value = this.caclulateSkillValue('dexterity');
        if (['Бард', 'Монах', 'Следопыт', 'Плут'].includes(this.state.class)) {
          value += 2;
        }
        break;
      case 'constitution':
        value = this.caclulateSkillValue('constitution');
        if (['Воин', 'Варвар', 'Чародей'].includes(this.state.class)) {
          value += 2;
        }
        break;
      case 'intelligence':
        value = this.caclulateSkillValue('intelligence');
        if (['Друид', 'Плут', 'Волшебник'].includes(this.state.class)) {
          value += 2;
        }
        break;
      case 'wisdom':
        value = this.caclulateSkillValue('wisdom');
        if (['Жрец', 'Друид', 'Паладин', 'Колдун', 'Волшебник'].includes(this.state.class)) {
          value += 2;
        }
        break;
      case 'charisma':
        value = this.caclulateSkillValue('charisma');
        if (['Бард', 'Жрец', 'Паладин', 'Колдун', 'Чародей'].includes(this.state.class)) {
          value += 2;
        }
        break;
    }

    return value;
  }

  getSkillValue(skill) {
    var value = 0;

    if (!this.state.class && !this.background) {
      return value;
    }

    if (['Атлетика'].includes(skill)) {
      value += this.caclulateSkillValue('strength');
    }

    if (['Акробатика', 'Ловкость рук', 'Скрытность'].includes(skill)) {
      value += this.caclulateSkillValue('dexterity');
    }

    if (['Анализ', 'История', 'Магия', 'Природа', 'Религия'].includes(skill)) {
      value += this.caclulateSkillValue('intelligence');
    }
    
    if (['Внимательность', 'Выживание', 'Медицина', 'Проницательность', 'Уход за животными'].includes(skill)) {
      value += this.caclulateSkillValue('wisdom');
    }

    if (['Выступление', 'Запугивание', 'Обман', 'Убеждение'].includes(skill)) {
      value += this.caclulateSkillValue('charisma');
    }

    switch(skill) {
      case 'Акробатика': if (this.state.acrobatics) { value += 2 } break;
      case 'Анализ': if (this.state.investigation) { value += 2 } break;
      case 'Атлетика': if (this.state.athletics) { value += 2 } break;
      case 'Внимательность': if (this.state.perception) { value += 2 } break;
      case 'Выживание': if (this.state.survival) { value += 2 } break;
      case 'Выступление': if (this.state.performance) { value += 2 } break;
      case 'Запугивание': if (this.state.intimidation) { value += 2 } break;
      case 'История': if (this.state.history) { value += 2 } break;
      case 'Ловкость рук': if (this.state.sleightOfHand) { value += 2 } break;
      case 'Магия': if (this.state.arcana) { value += 2 } break;
      case 'Медицина': if (this.state.medicine) { value += 2 } break;
      case 'Обман': if (this.state.deception) { value += 2 } break;
      case 'Природа': if (this.state.nature) { value += 2 } break;
      case 'Проницательность': if (this.state.insight) { value += 2 } break;
      case 'Религия': if (this.state.religion) { value += 2 } break;
      case 'Скрытность': if (this.state.stealth) { value += 2 } break;
      case 'Убеждение': if (this.state.persuasion) { value += 2 } break;
      case 'Уход за животными': if (this.state.animalHandling) { value += 2 } break;
    }

    if (this.state.background && this.getSkillsByBackground().includes(value)) {
      value += 2;
    }

    return value;
  }

  caclulateSkillValue(skill) {
    switch(skill) {
      case 'strength': return Math.floor((Number(this.state.strength) + Number(this.state.bonusStrength) - 10) / 2);
      case 'dexterity': return Math.floor((Number(this.state.dexterity) + Number(this.state.bonusDexterity) - 10) / 2);
      case 'constitution': return Math.floor((Number(this.state.constitution) + Number(this.state.bonusConstitution) - 10) / 2);
      case 'intelligence': return Math.floor((Number(this.state.intelligence) + Number(this.state.bonusIntelligence) - 10) / 2);
      case 'wisdom': return Math.floor((Number(this.state.wisdom) + Number(this.state.bonusWisdom) - 10) / 2);
      case 'charisma': return Math.floor((Number(this.state.charisma) + Number(this.state.bonusCharisma) - 10) / 2);
    } 
  }

  getSkillDisabled(skill, value) {

    if (!this.state.class || !this.state.background) {
      return true;
    }

    if (this.getSkillsByBackground().includes(skill)) {
      return true;
    }

    var maxSkillCount;
    switch (this.state.class) {
      case 'Варвар': maxSkillCount = 2; break;
      case 'Бард': maxSkillCount = 3; break;
      case 'Жрец': maxSkillCount = 2; break;
      case 'Друид': maxSkillCount = 2; break;
      case 'Воин': maxSkillCount = 2; break;
      case 'Монах': maxSkillCount = 2; break;
      case 'Паладин': maxSkillCount = 2; break;
      case 'Следопыт': maxSkillCount = 2; break;
      case 'Плут': maxSkillCount = 4; break;
      case 'Чародей': maxSkillCount = 2; break;
      case 'Колдун': maxSkillCount = 2; break;
      case 'Волшебник': maxSkillCount = 2; break;
    }

    if (!value && maxSkillCount == this.getSelectedSkillsCount()) {
      return true;
    }

    if (this.getAvailableSkillsByClass().includes(skill)) {
      return false;
    } 

    return true;
  }

  getAvailableSkillsByClass() {
    switch(this.state.class) {
      case 'Варвар': return ['Атлетика', 'Внимательность', 'Выживание', 'Запугивание', 'Природа', 'Уход за животными'];
      case 'Бард': return ['Акробатика', 'Анализ', 'Атлетика', 'Внимательность', 'Выживание', 'Выступление', 'Запугивание', 'История', 'Ловкость рук',
        'Магия', 'Медицина', 'Обман', 'Природа', 'Проницательность', 'Религия', 'Скрытность', 'Убеждение', 'Уход за животными'];
      case 'Жрец': return ['История', 'Медицина', 'Проницательность', 'Религия', 'Убеждение'];
      case 'Друид': return ['Внимательность', 'Выживание', 'Магия', 'Медицина', 'Уход за животными', 'Природа', 'Проницательность', 'Религия'];
      case 'Воин': return ['Акробатика', 'Атлетика', 'Внимательность', 'Выживание', 'Запугивание', 'История', 'Проницательность', 'Уход за животными'];
      case 'Монах': return ['Акробатика', 'Атлетика', 'История', 'Проницательность', 'Религия', 'Скрытность'];
      case 'Паладин': return ['Атлетика', 'Запугивание', 'Медицина', 'Проницательность', 'Религия' ,'Убеждение'];
      case 'Следопыт': return ['Анализ', 'Атлетика', 'Внимательность', 'Выживание', 'Природа', 'Проницательность', 'Скрытность', 'Уход за животными'];
      case 'Плут': return ['Акробатика', 'Анализ', 'Атлетика', 'Внимательность', 'Выступление', 'Запугивание', 'Ловкость рук', 'Обман', 'Проницательность',
        'Скрытность', 'Убеждение'];
      case 'Чародей': return ['Запугивание', 'Магия', 'Обман', 'Проницательность', 'Религия', 'Убеждение'];
      case 'Колдун': return ['Анализ', 'Запугивание', 'История', 'Магия', 'Обман', 'Природа', 'Религия'];
      case 'Волшебник': return ['Анализ', 'История', 'Магия', 'Медицина', 'Проницательность', 'Религия'];
    }
  }

  getSkillsByBackground() {
    switch(this.state.background) {
      case 'Прислужник': return ['Проницательность', 'Религия'];
      case 'Шарлатан': return ['Ловкость рук', 'Обман'];
      case 'Преступник': return ['Обман', 'Скрытность'];
      case 'Артист': return ['Акробатика', 'Выступление'];
      case 'Народный герой': return ['Выживание', 'Уход за животными'];
      case 'Гильдейский ремесленник': return ['Проницательность', 'Убеждение'];
      case 'Отшельник': return ['Медицина', 'Религия'];
      case 'Благородный': return ['История', 'Убеждение'];
      case 'Чужеземец': return ['Атлетика', 'Выживание'];
      case 'Мудрец': return ['История', 'Магия'];
      case 'Моряк': return ['Атлетика', 'Внимательность'];
      case 'Солдат': return ['Атлетика', 'Запугивание'];
      case 'Безпризорник': return ['Ловкость рук', 'Скрытность'];
    }
  }

  getSelectedSkillsCount() {
    var count = 0;

    switch(this.state.class) {
      case 'Варвар': 
        if (this.state.athletics && !this.getSkillsByBackground().includes('Атлетика')) { count++; }
        if (this.state.perception && !this.getSkillsByBackground().includes('Внимательность')) { count++; }
        if (this.state.survival && !this.getSkillsByBackground().includes('Выживание')) { count++; }
        if (this.state.intimidation && !this.getSkillsByBackground().includes('Запугивание')) { count++; }
        if (this.state.nature && !this.getSkillsByBackground().includes('Природа')) { count++; }
        if (this.state.animalHandling && !this.getSkillsByBackground().includes('Уход за животными')) { count++; }
        break;
      case 'Бард':
        if (this.state.acrobatics && !this.getSkillsByBackground().includes('Акробатика')) { count++; }
        if (this.state.investigation && !this.getSkillsByBackground().includes('Анализ')) { count++; }
        if (this.state.athletics && !this.getSkillsByBackground().includes('Атлетика')) { count++; }
        if (this.state.perception && !this.getSkillsByBackground().includes('Внимательность')) { count++; }
        if (this.state.survival && !this.getSkillsByBackground().includes('Выживание')) { count++; }
        if (this.state.performance && !this.getSkillsByBackground().includes('Выступление')) { count++; }
        if (this.state.intimidation && !this.getSkillsByBackground().includes('Запугивание')) { count++; }
        if (this.state.history && !this.getSkillsByBackground().includes('История')) { count++; }
        if (this.state.sleightOfHand && !this.getSkillsByBackground().includes('Ловкость рук')) { count++; }
        if (this.state.arcana && !this.getSkillsByBackground().includes('Магия')) { count++; }
        if (this.state.medicine && !this.getSkillsByBackground().includes('Медицина')) { count++; }
        if (this.state.deception && !this.getSkillsByBackground().includes('Обман')) { count++; }
        if (this.state.nature && !this.getSkillsByBackground().includes('Природа')) { count++; }
        if (this.state.insight && !this.getSkillsByBackground().includes('Проницательность')) { count++; }
        if (this.state.religion && !this.getSkillsByBackground().includes('Религия')) { count++; }
        if (this.state.stealth && !this.getSkillsByBackground().includes('Скрытность')) { count++; }
        if (this.state.persuasion && !this.getSkillsByBackground().includes('Убеждение')) { count++; }
        if (this.state.animalHandling && !this.getSkillsByBackground().includes('Уход за животными')) { count++; }
        break;
      case 'Жрец':
        if (this.state.history && !this.getSkillsByBackground().includes('История')) { count++; }
        if (this.state.medicine && !this.getSkillsByBackground().includes('Медицина')) { count++; }
        if (this.state.insight && !this.getSkillsByBackground().includes('Проницательность')) { count++; }
        if (this.state.religion && !this.getSkillsByBackground().includes('Религия')) { count++; }
        if (this.state.persuasion && !this.getSkillsByBackground().includes('Убеждение')) { count++; }
        break;
      case 'Друид':
        if (this.state.perception && !this.getSkillsByBackground().includes('Внимательность')) { count++; }
        if (this.state.survival && !this.getSkillsByBackground().includes('Выживание')) { count++; }
        if (this.state.arcana && !this.getSkillsByBackground().includes('Магия')) { count++; }
        if (this.state.medicine && !this.getSkillsByBackground().includes('Медицина')) { count++; }
        if (this.state.animalHandling && !this.getSkillsByBackground().includes('Уход за животными')) { count++; }
        if (this.state.nature && !this.getSkillsByBackground().includes('Природа')) { count++; }
        if (this.state.insight && !this.getSkillsByBackground().includes('Проницательность')) { count++; }
        break;
      case 'Воин':
        if (this.state.acrobatics && !this.getSkillsByBackground().includes('Акробатика')) { count++; }
        if (this.state.athletics && !this.getSkillsByBackground().includes('Атлетика')) { count++; }
        if (this.state.perception && !this.getSkillsByBackground().includes('Внимательность')) { count++; }
        if (this.state.survival && !this.getSkillsByBackground().includes('Выживание')) { count++; }
        if (this.state.intimidation && !this.getSkillsByBackground().includes('Запугивание')) { count++; }
        if (this.state.history && !this.getSkillsByBackground().includes('История')) { count++; }
        if (this.state.insight && !this.getSkillsByBackground().includes('Проницательность')) { count++; }
        if (this.state.animalHandling && !this.getSkillsByBackground().includes('Уход за животными')) { count++; }
        break;
      case 'Монах': 
        if (this.state.acrobatics && !this.getSkillsByBackground().includes('Акробатика')) { count++; }
        if (this.state.athletics && !this.getSkillsByBackground().includes('Атлетика')) { count++; }
        if (this.state.history && !this.getSkillsByBackground().includes('История')) { count++; }
        if (this.state.insight && !this.getSkillsByBackground().includes('Проницательность')) { count++; }
        if (this.state.religion && !this.getSkillsByBackground().includes('Религия')) { count++; }
        if (this.state.stealth && !this.getSkillsByBackground().includes('Скрытность')) { count++; }
        break;
      case 'Паладин':
        if (this.state.athletics && !this.getSkillsByBackground().includes('Атлетика')) { count++; }
        if (this.state.intimidation && !this.getSkillsByBackground().includes('Запугивание')) { count++; }
        if (this.state.medicine && !this.getSkillsByBackground().includes('Медицина')) { count++; }
        if (this.state.insight && !this.getSkillsByBackground().includes('Проницательность')) { count++; }
        if (this.state.religion && !this.getSkillsByBackground().includes('Религия')) { count++; }
        if (this.state.persuasion && !this.getSkillsByBackground().includes('Убеждение')) { count++; }
        break;
      case 'Следопыт':
        if (this.state.investigation && !this.getSkillsByBackground().includes('Анализ')) { count++; }
        if (this.state.athletics && !this.getSkillsByBackground().includes('Атлетика')) { count++; }
        if (this.state.perception && !this.getSkillsByBackground().includes('Внимательность')) { count++; }
        if (this.state.survival && !this.getSkillsByBackground().includes('Выживание')) { count++; }
        if (this.state.nature && !this.getSkillsByBackground().includes('Природа')) { count++; }
        if (this.state.insight && !this.getSkillsByBackground().includes('Проницательность')) { count++; }
        if (this.state.stealth && !this.getSkillsByBackground().includes('Скрытность')) { count++; }
        if (this.state.animalHandling && !this.getSkillsByBackground().includes('Уход за животными')) { count++; }
        break;
      case 'Плут':
        if (this.state.acrobatics && !this.getSkillsByBackground().includes('Акробатика')) { count++; }
        if (this.state.investigation && !this.getSkillsByBackground().includes('Анализ')) { count++; }
        if (this.state.athletics && !this.getSkillsByBackground().includes('АкробАтлетикаатика')) { count++; }
        if (this.state.perception && !this.getSkillsByBackground().includes('Внимательность')) { count++; }
        if (this.state.performance && !this.getSkillsByBackground().includes('Выступление')) { count++; }
        if (this.state.intimidation && !this.getSkillsByBackground().includes('Запугивание')) { count++; }
        if (this.state.sleightOfHand && !this.getSkillsByBackground().includes('Ловкость рук')) { count++; }
        if (this.state.deception && !this.getSkillsByBackground().includes('Обман')) { count++; }
        if (this.state.insight && !this.getSkillsByBackground().includes('Проницательность')) { count++; }
        if (this.state.stealth && !this.getSkillsByBackground().includes('Скрытность')) { count++; }
        if (this.state.persuasion && !this.getSkillsByBackground().includes('Убеждение')) { count++; }
        break;
      case 'Чародей':
        if (this.state.intimidation && !this.getSkillsByBackground().includes('Запугивание')) { count++; }
        if (this.state.arcana && !this.getSkillsByBackground().includes('Магия')) { count++; }
        if (this.state.deception && !this.getSkillsByBackground().includes('Обман')) { count++; }
        if (this.state.insight && !this.getSkillsByBackground().includes('Проницательность')) { count++; }
        if (this.state.religion && !this.getSkillsByBackground().includes('Религия')) { count++; }
        if (this.state.persuasion && !this.getSkillsByBackground().includes('Убеждение')) { count++; }
        break;
      case 'Колдун':
        if (this.state.investigation && !this.getSkillsByBackground().includes('Анализ')) { count++; }
        if (this.state.intimidation && !this.getSkillsByBackground().includes('Запугивание')) { count++; }
        if (this.state.history && !this.getSkillsByBackground().includes('История')) { count++; }
        if (this.state.arcana && !this.getSkillsByBackground().includes('Магия')) { count++; }
        if (this.state.deception && !this.getSkillsByBackground().includes('Обман')) { count++; }
        if (this.state.nature && !this.getSkillsByBackground().includes('Природа')) { count++; }
        if (this.state.religion && !this.getSkillsByBackground().includes('Религия')) { count++; }
        break;
      case 'Волшебник':
        if (this.state.investigation && !this.getSkillsByBackground().includes('Анализ')) { count++; }
        if (this.state.history && !this.getSkillsByBackground().includes('История')) { count++; }
        if (this.state.arcana && !this.getSkillsByBackground().includes('Магия')) { count++; }
        if (this.state.medicine && !this.getSkillsByBackground().includes('Медицина')) { count++; }
        if (this.state.insight && !this.getSkillsByBackground().includes('Проницательность')) { count++; }
        if (this.state.religion && !this.getSkillsByBackground().includes('Религия')) { count++; }
        break;
    }

    return count;
  }

  render() {

    return (
      <Container>
      <Box my={4}>
        <h1>Создание персонажа</h1>
        <Grid container spacing={8}>
        <Grid item sm={6}>

          <TextField id="name" name="name" label="Имя" value={this.state.name} onChange={event => this.setState({name: event.target.value})} fullWidth />

          <FormControl fullWidth className="mt-3">
            <InputLabel id="class-label-id">Расса</InputLabel>
            <Select name="race" labelId="class-label-id" value={this.state.race} onChange={event => this.handleRaceChange(event.target.value)} required>
              <MenuItem value="Дварф">Дварф</MenuItem>
              <MenuItem value="Эльф">Эльф</MenuItem>
              <MenuItem value="Полурослик">Полурослик</MenuItem>
              <MenuItem value="Человек">Человек</MenuItem>
              <MenuItem value="Драконорожденный">Драконорожденный</MenuItem>
              <MenuItem value="Гном">Гном</MenuItem>
              <MenuItem value="Полуэльф">Полуэльф</MenuItem>
              <MenuItem value="Полуорк">Полуорк</MenuItem>
              <MenuItem value="Тифлинг">Тифлинг</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth className="mt-3">
            <InputLabel id="class-label-id">Класс</InputLabel>
            <Select name="class" labelId="class-label-id" value={this.state.class} onChange={event => this.handleClassChange(event.target.value)} required>
              <MenuItem value="Варвар">Варвар</MenuItem>
              <MenuItem value="Бард">Бард</MenuItem>
              <MenuItem value="Жрец">Жрец</MenuItem>
              <MenuItem value="Друид">Друид</MenuItem>
              <MenuItem value="Воин">Воин</MenuItem>
              <MenuItem value="Монах">Монах</MenuItem>
              <MenuItem value="Паладин">Паладин</MenuItem>
              <MenuItem value="Следопыт">Следопыт</MenuItem>
              <MenuItem value="Плут">Плут</MenuItem>
              <MenuItem value="Чародей">Чародей</MenuItem>
              <MenuItem value="Колдун">Колдун</MenuItem>
              <MenuItem value="Волшебник">Волшебник</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth className="mt-3">
            <InputLabel id="class-label-id">Предистория</InputLabel>
            <Select name="background" labelId="class-label-id" value={this.state.background} onChange={event => this.handleBackgroundChange(event.target.value)} required>
              <MenuItem value="Прислужник">Прислужник</MenuItem>
              <MenuItem value="Шарлатан">Шарлатан</MenuItem>
              <MenuItem value="Преступник">Преступник</MenuItem>
              <MenuItem value="Артист">Артист</MenuItem>
              <MenuItem value="Народный герой">Народный герой</MenuItem>
              <MenuItem value="Гильдейский ремесленник">Гильдейский ремесленник</MenuItem>
              <MenuItem value="Отшельник">Отшельник</MenuItem>
              <MenuItem value="Благородный">Благородный</MenuItem>
              <MenuItem value="Чужеземец">Чужеземец</MenuItem>
              <MenuItem value="Мудрец">Мудрец</MenuItem>
              <MenuItem value="Моряк">Моряк</MenuItem>
              <MenuItem value="Солдат">Солдат</MenuItem>
              <MenuItem value="Безпризорник">Безпризорник</MenuItem>
            </Select>
          </FormControl>

          <TextField type="number" name="level" label="Уровень" value={this.state.level} 
            onChange={event => this.setState({level: event.target.value})} fullWidth className="mt-3" />

          <h5 className="mt-4">Основные характеристики</h5>
          <Grid container spacing={2} className="mt-1">
            <Grid item sm={2}>
              <TextField type="number" name="strength" label="Сила" value={this.state.strength} 
                onChange={event => this.setState({strength: event.target.value})} fullWidth />
            </Grid>
            <Grid item sm={2}>
              <TextField type="number" name="dexterity" label="Ловкость" value={this.state.dexterity} 
                onChange={event => this.setState({dexterity: event.target.value})} fullWidth />
            </Grid>
            <Grid item sm={2}>
              <TextField type="number" name="constitution" label="Телосложение" value={this.state.constitution} 
                onChange={event => this.setState({constitution: event.target.value})} fullWidth />
            </Grid>
            <Grid item sm={2}>
              <TextField type="number" name="intelligence" label="Интеллект" value={this.state.intelligence} 
                onChange={event => this.setState({intelligence: event.target.value})} fullWidth />
            </Grid>
            <Grid item sm={2}>
              <TextField type="number" name="wisdom" label="Мудрость" value={this.state.wisdom} 
                onChange={event => this.setState({wisdom: event.target.value})} fullWidth />
            </Grid>
            <Grid item sm={2}>
              <TextField type="number" name="charisma" label="Харизма" value={this.state.charisma} 
                onChange={event => this.setState({charisma: event.target.value})} fullWidth />
            </Grid>
          </Grid>

          <div className="mt-4" style={{position: 'relative'}}>
            <h5>Бонусные характеристики</h5>
            {this.state.race === 'Человек' ? (
              <FormControlLabel style={{position: 'absolute', top: '-6px', right: 0}}
                control={<Checkbox onChange={() => this.handleAlternativeHumanChange()} name="alternativeHuman" value="alternativeHuman" />}
                label="Альтернативный вариант"
              />
            ) : (
              <span></span>
            )}    
          </div>
          <Grid container spacing={2} className="mt-1">
            <Grid item sm={2}>
              <TextField type="number" name="bonusStrength" label="Сила" value={this.state.bonusStrength} 
                onChange={event => this.setState({bonusStrength: event.target.value})} fullWidth disabled={(!this.state.strengthEditable) ? true : false} />
            </Grid>
            <Grid item sm={2}>
              <TextField type="number" name="bonusDexterity" label="Ловкость" value={this.state.bonusDexterity} 
                onChange={event => this.setState({bonusDexterity: event.target.value})} fullWidth disabled={(!this.state.dexterityEditable)? true : false} />
            </Grid>
            <Grid item sm={2}>
              <TextField type="number" name="bonusConstitution" label="Телосложение" value={this.state.bonusConstitution} 
                onChange={event => this.setState({bonusConstitution: event.target.value})} fullWidth disabled={(!this.state.constitutionEditable)? true : false} />
            </Grid>
            <Grid item sm={2}>
              <TextField type="number" name="bonusIntelligence" label="Интеллект" value={this.state.bonusIntelligence} 
                onChange={event => this.setState({bonusIntelligence: event.target.value})} fullWidth disabled={(!this.state.intelligenceEditable)? true : false} />
            </Grid>
            <Grid item sm={2}>
              <TextField type="number" name="bonusWisdom" label="Мудрость" value={this.state.bonusWisdom} 
                onChange={event => this.setState({bonusWisdom: event.target.value})} fullWidth disabled={(!this.state.wisdomEditable)? true : false} />
            </Grid>
            <Grid item sm={2}>
              <TextField type="number" name="bonusCharisma" label="Харизма" value={this.state.bonusCharisma} 
                onChange={event => this.setState({bonusCharisma: event.target.value})} fullWidth disabled={(!this.state.charismaEditable)? true : false} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item sm={6}>
        <div className="mt-4 mb-2">
            <h5>Спасброски</h5>
            <Grid container spacing={2} className="mt-1">
              <Grid item sm={4}>
                Сила: <b className="mr-5 pull-right">{this.getSavethrow('strength')}</b>
              </Grid>
              <Grid item sm={4}>
                Ловкость: <b className="mr-5 pull-right">{this.getSavethrow('dexterity')}</b>
              </Grid>
              <Grid item sm={4}>
                Телосложение: <b className="mr-5 pull-right">{this.getSavethrow('constitution')}</b>
              </Grid>
              <Grid item sm={4}>
                Интеллект: <b className="mr-5 pull-right">{this.getSavethrow('intelligence')}</b>
              </Grid>
              <Grid item sm={4}>
                Мудрость: <b className="mr-5 pull-right">{this.getSavethrow('wisdom')}</b>
              </Grid>
              <Grid item sm={4}>
                Харизма: <b className="mr-5 pull-right">{this.getSavethrow('charisma')}</b>
              </Grid>
            </Grid>
          </div>

          <div className="mt-4 mb-2 skills">
            <h5>Навыки</h5>
            <Grid container spacing={0} className="mt-1">

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('acrobatics')} name="acrobatics" value="acrobatics" />}
                  label="Акробатика" checked={this.state.acrobatics}
                  disabled={this.getSkillDisabled('Акробатика', this.state.acrobatics)}
                />
              <b className="skill-value">{this.getSkillValue('Акробатика')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('arcana')} name="arcana" value="arcana" />}
                  label="Магия" checked={this.state.arcana}
                  disabled={this.getSkillDisabled('Магия', this.state.arcana)}
                />
                <b className="skill-value">{this.getSkillValue('Магия')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('investigation')} name="investigation" value="investigation" />}
                  label="Анализ" checked={this.state.investigation}
                  disabled={this.getSkillDisabled('Анализ', this.state.investigation)}
                />
              <b className="skill-value">{this.getSkillValue('Анализ')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('medicine')} name="medicine" value="medicine" />}
                  label="Медицина" checked={this.state.medicine}
                  disabled={this.getSkillDisabled('Медицина', this.state.medicine)}
                />
              <b className="skill-value">{this.getSkillValue('Медицина')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('athletics')} name="athletics" value="athletics" />}
                  label="Атлетика" checked={this.state.athletics}
                  disabled={this.getSkillDisabled('Атлетика', this.state.athletics)}
                />
              <b className="skill-value">{this.getSkillValue('Атлетика')}</b>
              </Grid>
              
              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('deception')} name="deception" value="deception" />}
                  label="Обман" checked={this.state.deception}
                  disabled={this.getSkillDisabled('Обман', this.state.deception)}
                />
              <b className="skill-value">{this.getSkillValue('Обман')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('perception')} name="perception" value="perception" />}
                  label="Внимательность" checked={this.state.perception}
                  disabled={this.getSkillDisabled('Внимательность', this.state.perception)}
                />
              <b className="skill-value">{this.getSkillValue('Внимательность')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('nature')} name="nature" value="nature" />}
                  label="Природа" checked={this.state.nature}
                  disabled={this.getSkillDisabled('Природа', this.state.nature)}
                />
              <b className="skill-value">{this.getSkillValue('Природа')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('survival')} name="survival" value="survival" />}
                  label="Выживание" checked={this.state.survival}
                  disabled={this.getSkillDisabled('Выживание', this.state.survival)}
                />
              <b className="skill-value">{this.getSkillValue('Выживание')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('insight')} name="insight" value="insight" />}
                  label="Проницательность" checked={this.state.insight}
                  disabled={this.getSkillDisabled('Проницательность', this.state.insight)}
                />
              <b className="skill-value">{this.getSkillValue('Проницательность')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('performance')} name="performance" value="performance" />}
                  label="Выступление" checked={this.state.performance}
                  disabled={this.getSkillDisabled('Выступление', this.state.performance)}
                />
              <b className="skill-value">{this.getSkillValue('Выступление')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('religion')} name="religion" value="religion" />}
                  label="Религия" checked={this.state.religion}
                  disabled={this.getSkillDisabled('Религия', this.state.religion)}
                />
              <b className="skill-value">{this.getSkillValue('Религия')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('intimidation')} name="intimidation" value="intimidation" />}
                  label="Запугивание" checked={this.state.intimidation}
                  disabled={this.getSkillDisabled('Запугивание', this.state.intimidation)}
                />
              <b className="skill-value">{this.getSkillValue('Запугивание')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('stealth')} name="stealth" value="stealth" />}
                  label="Скрытность" checked={this.state.stealth}
                  disabled={this.getSkillDisabled('Скрытность', this.state.stealth)}
                />
              <b className="skill-value">{this.getSkillValue('Скрытность')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('history')} name="history" value="history" />}
                  label="История" checked={this.state.history}
                  disabled={this.getSkillDisabled('История', this.state.history)}
                />
              <b className="skill-value">{this.getSkillValue('История')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('persuasion')} name="persuasion" value="persuasion" />}
                  label="Убеждение" checked={this.state.persuasion}
                  disabled={this.getSkillDisabled('Убеждение', this.state.persuasion)}
                />
              <b className="skill-value">{this.getSkillValue('Убеждение')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('sleightOfHand')} name="sleightOfHand" value="sleightOfHand" />}
                  label="Ловкость рук" checked={this.state.sleightOfHand}
                  disabled={this.getSkillDisabled('Ловкость рук', this.state.sleightOfHand)}
                />
              <b className="skill-value">{this.getSkillValue('Ловкость рук')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('animalHandling')} name="animalHandling" value="animalHandling" />}
                  label="Уход за животными" checked={this.state.animalHandling}
                  disabled={this.getSkillDisabled('Уход за животными', this.state.animalHandling)}
                />
              <b className="skill-value">{this.getSkillValue('Уход за животными')}</b>
              </Grid>

            </Grid>
          </div>
        </Grid>  
        </Grid>
        <Button variant="contained" color="primary" onClick={() => this.handleSubmit()} className="mt-4">
            Экспорт в PDF
          </Button>
      </Box>
    </Container>
    );
  }

  generatePdf() {
    fetch('files/Character Sheet - Form Fillable.pdf')
    .then(text  => { 

        (async () => {

          const {
            PDFDocument,
            PDFName,
            PDFString,
            PDFNumber,
            PDFBool,
            PDFContentStream,
            PDFDictionary,
            PDFArray,
            FontHelvetica,
            drawLinesOfText,
            rgb
          } = require( 'pdf-lib' );

          var bytes = await text.arrayBuffer();
          
          const pdfDoc = await PDFDocument.load(bytes);


          const acroForm = await pdfDoc.context.lookup(
            pdfDoc.catalog.get(PDFName.of('AcroForm')),
          );

          const acroFieldRefs = await pdfDoc.context.lookup(
            acroForm.get(PDFName.of('Fields')),
          );

          const findAcroFieldByName = (name) => {
            return acroFieldRefs.array.find((acroField) => {
              const fieldName = acroField.getMaybe('T');
              return !!fieldName && fieldName.string === name;
            });
          };

          const fillAcroTextField = (
            pdfDoc,
            acroField,
            fontObject,
            text,
            fontSize = 15,
          ) => {
            const fieldRect = acroField.get('Rect');
            const fieldWidth = fieldRect.get(2).number - fieldRect.get(0).number;
            const fieldHeight = fieldRect.get(3).number - fieldRect.get(1).number;
          
            const appearanceStream = pdfDoc.register(
              PDFContentStream.of(
                PDFDictionary.from({
                  Type: PDFName.from('XObject'),
                  Subtype: PDFName.from('Form'),
                  BBox: PDFArray.fromArray([
                    PDFNumber.fromNumber(0),
                    PDFNumber.fromNumber(0),
                    PDFNumber.fromNumber(fieldWidth),
                    PDFNumber.fromNumber(fieldHeight),
                  ], pdfDoc.index),
                  Resources: PDFDictionary.from({
                    Font: PDFDictionary.from({
                      FontObject: fontObject
                    }, pdfDoc.index)
                  }, pdfDoc.index),
                }, pdfDoc.index),
                drawLinesOfText(text.split('\n'), {
                  x: 2,
                  y: fieldHeight - 13,
                  font: 'FontObject',
                  size: fontSize,
                  colorRgb: [0, 0, 0],
                })
              ),
            );
           
            acroField.set('V', PDFString.fromString(text));
            acroField.set('Ff', PDFNumber.fromNumber(1));
            acroField.set('AP', PDFDictionary.from({ N: appearanceStream }, pdfDoc.index));
          };

          const fillInField = (fieldName, text, fontSize) => {
            const field = findAcroFieldByName(fieldName);
            if (!field) throw new Error(`Missing AcroField: ${fieldName}`);
            fillAcroTextField(pdfDoc, field, FontHelvetica, text, fontSize);
          };

          fillInField('Name', 'Mario');

          debugger;



          var fontData = await fetch('files/font.ttf')
          .then(font => {
            return font.arrayBuffer();
          });
        
          pdfDoc.registerFontkit(fontkit)
          const customFont = await pdfDoc.embedFont(fontData)

          const pages = pdfDoc.getPages()

          const firstPage = pages[0]
          const { width, height } = firstPage.getSize()          
          firstPage.ignoreEncryption = true;

          var strengthStr = this.caclulateSkillValue('strength') > 0 ? '+' + this.caclulateSkillValue('strength') : this.caclulateSkillValue('strength');

          firstPage.drawText(this.state.name, { x: 60, y: height - 75, size: 20, font: customFont, color: rgb(0,0,0) });
          firstPage.drawText(this.state.race, { x: 270, y: height - 85, size: 14, font: customFont, color: rgb(0,0,0) });
          firstPage.drawText(this.state.class + ', ур. ' + this.state.level, { x: 270, y: height - 60, size: 14, font: customFont, color: rgb(0,0,0) });
          firstPage.drawText(strengthStr, { x: 47, y: height - 175, size: 18, font: customFont, color: rgb(0,0,0) });

          // Serialize the PDFDocument to bytes (a Uint8Array)
          const pdfBytes = await pdfDoc.save()

          var blob = new Blob([pdfBytes], {type: "application/pdf"});
          var link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          var fileName = "test";
          link.download = fileName;
          link.click();
        })(); 
    })
  }
}

export default App;