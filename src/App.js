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
      alternativeHuman: false
    }
  }

  handleSubmit() {
    this.generatePdf();
  }

  handleRaceChange(value) {
    this.setState({race: value});
    this.setState({strength: ''});
    this.setState({bonusStrength: ''});
    this.setState({strengthEditable: false});
    this.setState({dexterity: ''});
    this.setState({bonusDexterity: ''});
    this.setState({dexterityEditable: false});
    this.setState({constitution: ''});
    this.setState({bonusConstitution: ''});
    this.setState({constitutionEditable: false});
    this.setState({intelligence: ''});
    this.setState({bonusIntelligence: ''});
    this.setState({intelligenceEditable: false});
    this.setState({wisdom: ''});
    this.setState({bonusWisdom: ''});
    this.setState({wisdomEditable: false});
    this.setState({charisma: ''});
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

  render() {

    return (
      <Container>
      <Box my={4}>
        <h1>Создание персонажа</h1>
        <Grid item xs={6}>

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

          <TextField type="number" name="level" label="Уровень" value={this.state.level} 
            onChange={event => this.setState({level: event.target.value})} fullWidth className="mt-3" />

          <div className="mt-4">Основные характеристики</div>
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
            <span>Бонусные характеристики</span>
            {this.state.race === 'Человек' ? (
              <FormControlLabel style={{position: 'absolute', top: '-6px', right: 0}}
                control={<Checkbox onChange={() => this.handleAlternativeHumanChange()} name="alternativeHuman" value="alternativeHuman" />}
                label="Альтернативный вариант человека"
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

          <Button variant="contained" color="primary" onClick={() => this.handleSubmit()} className="mt-4">
            Submit
          </Button>
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