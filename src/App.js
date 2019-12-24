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
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
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
      strength: '',
      dexterity: '',
      constitution: '',
      intelligence: '',
      wisdom: '',
      charisma: '',
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

    if (!this.state.class) {
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

    if (!this.state.class) {
      return true;
    }

    var maxSkillCount;
    switch (this.state.class) {
      case 'Варвар': maxSkillCount = 2; break;

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
      case 'Воин': return [];
      case 'Монах': return [];
      case 'Паладин': return [];
      case 'Следопыт': return [];
      case 'Плут': return [];
      case 'Чародей': return [];
      case 'Колдун': return [];
      case 'Волшебник': return [];
    }
  }

  getSelectedSkillsCount() {
    var count = 0;

    switch(this.state.class) {
      case 'Варвар': 
        if (this.state.athletics) { count++; }
        if (this.state.perception) { count++; }
        if (this.state.survival) { count++; }
        if (this.state.intimidation) { count++; }
        if (this.state.nature) { count++; }
        if (this.state.animalHandling) { count++; }
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
            <Select name="class" labelId="class-label-id" value={this.state.class} onChange={event => this.setState({class: event.target.value})} required>
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
            <Select name="background" labelId="class-label-id" value={this.state.background} onChange={event => this.setState({background: event.target.value})} required>
              <MenuItem value="Прислужник">Прислужник</MenuItem>
              <MenuItem value="Шарлатан">Шарлатан</MenuItem>
              <MenuItem value="Преступник">Преступник</MenuItem>
              <MenuItem value="Артист">Артист</MenuItem>
              <MenuItem value="Гильдейский ремесленник">Гильдейский ремесленник</MenuItem>
              <MenuItem value="Отшельник">Отшельник</MenuItem>
              <MenuItem value="Благородный">Благородный</MenuItem>
              <MenuItem value="Чужеземец">Чужеземец</MenuItem>
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
                  label="Акробатика"
                  disabled={this.getSkillDisabled('Акробатика', this.state.acrobatics)}
                />
              <b className="skill-value">{this.getSkillValue('Акробатика')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('arcana')} name="arcana" value="arcana" />}
                  label="Магия"
                  disabled={this.getSkillDisabled('Магия')}
                />
                <b className="skill-value">{this.getSkillValue('Магия')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('investigation')} name="investigation" value="investigation" />}
                  label="Анализ"
                  disabled={this.getSkillDisabled('Анализ')}
                />
              <b className="skill-value">{this.getSkillValue('Анализ')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('medicine')} name="medicine" value="medicine" />}
                  label="Медицина"
                  disabled={this.getSkillDisabled('Медицина')}
                />
              <b className="skill-value">{this.getSkillValue('Медицина')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('athletics')} name="athletics" value="athletics" />}
                  label="Атлетика"
                  disabled={this.getSkillDisabled('Атлетика', this.state.athletics)}
                />
              <b className="skill-value">{this.getSkillValue('Атлетика')}</b>
              </Grid>
              
              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('deception')} name="deception" value="deception" />}
                  label="Обман"
                  disabled={this.getSkillDisabled('Обман')}
                />
              <b className="skill-value">{this.getSkillValue('Обман')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('perception')} name="perception" value="perception" />}
                  label="Внимательность"
                  disabled={this.getSkillDisabled('Внимательность', this.state.perception)}
                />
              <b className="skill-value">{this.getSkillValue('Внимательность')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('nature')} name="nature" value="nature" />}
                  label="Природа"
                  disabled={this.getSkillDisabled('Природа', this.state.nature)}
                />
              <b className="skill-value">{this.getSkillValue('Природа')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('survival')} name="survival" value="survival" />}
                  label="Выживание"
                  disabled={this.getSkillDisabled('Выживание', this.state.survival)}
                />
              <b className="skill-value">{this.getSkillValue('Выживание')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('insight')} name="insight" value="insight" />}
                  label="Проницательность"
                  disabled={this.getSkillDisabled('Проницательность')}
                />
              <b className="skill-value">{this.getSkillValue('Проницательность')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('performance')} name="performance" value="performance" />}
                  label="Выступление"
                  disabled={this.getSkillDisabled('Выступление')}
                />
              <b className="skill-value">{this.getSkillValue('Выступление')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('religion')} name="religion" value="religion" />}
                  label="Религия"
                  disabled={this.getSkillDisabled('Религия')}
                />
              <b className="skill-value">{this.getSkillValue('Религия')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('intimidation')} name="intimidation" value="intimidation" />}
                  label="Запугивание"
                  disabled={this.getSkillDisabled('Запугивание', this.state.intimidation)}
                />
              <b className="skill-value">{this.getSkillValue('Запугивание')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('stealth')} name="stealth" value="stealth" />}
                  label="Скрытность"
                  disabled={this.getSkillDisabled('Скрытность')}
                />
              <b className="skill-value">{this.getSkillValue('Скрытность')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('history')} name="history" value="history" />}
                  label="История"
                  disabled={this.getSkillDisabled('История')}
                />
              <b className="skill-value">{this.getSkillValue('История')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('persuasion')} name="persuasion" value="persuasion" />}
                  label="Убеждение"
                  disabled={this.getSkillDisabled('Убеждение')}
                />
              <b className="skill-value">{this.getSkillValue('Убеждение')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('sleightOfHand')} name="sleightOfHand" value="sleightOfHand" />}
                  label="Ловкость рук"
                  disabled={this.getSkillDisabled('Ловкость рук')}
                />
              <b className="skill-value">{this.getSkillValue('Ловкость рук')}</b>
              </Grid>

              <Grid item sm={6} className="position-relative">
                <FormControlLabel
                  control={<Checkbox onChange={() => this.skillChange('animalHandling')} name="animalHandling" value="animalHandling" />}
                  label="Уход за животными"
                  disabled={this.getSkillDisabled('Уход за животными', this.state.animalHandling)}
                />
              <b className="skill-value">{this.getSkillValue('Уход за животными')}</b>
              </Grid>

            </Grid>
          </div>

          {/* <Button variant="contained" color="primary" onClick={() => this.handleSubmit()} className="mt-4">
            Submit
          </Button> */}
        </Grid>  
        </Grid>
      </Box>
    </Container>
    );
  }

  generatePdf() {
    fetch('files/template.pdf')
    .then(text  => { 
        (async () => {
          var bytes = await text.arrayBuffer();
          
          const pdfDoc = await PDFDocument.load(bytes)

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
          // firstPage.drawText(this.state.name, { x: 60, y: height - 75, size: 20, font: customFont, color: rgb(0,0,0) });
          // firstPage.drawText(this.state.race, { x: 270, y: height - 85, size: 14, font: customFont, color: rgb(0,0,0) });
          // firstPage.drawText(this.state.class + ', ур. ' + this.state.level, { x: 270, y: height - 60, size: 14, font: customFont, color: rgb(0,0,0) });
          // firstPage.drawText(this.state.strength.toString(), { x: 45, y: height - 175, size: 22, font: customFont, color: rgb(0,0,0) });

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