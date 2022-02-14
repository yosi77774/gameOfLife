import React, { useEffect, useState } from "react"

let runMode = true
var stop
//var Interval = 500
let Size = 10
let width = (500/Size)
let height = (500/Size)
let Seed = 0.3
let ShapeId = 1  

const Main =  () =>
{
    const [grid, setGrid] = useState([])
    //const [Size, setSize] = useState(10)
    const [Intervall, setNewInterval] = useState(500)
    //const [Seed, setSeed] = useState(0.3)
    
  useEffect(() => {
    setGrid(randomGrid())
  }, [])

  const randomGrid = () => {
    const grid1 = []
    let x = Size/3
    x=x.toFixed(0)

    for (let i = 0; i < Size; i++) {
      const row = []
      for (let j = 0; j < Size; j++) {

        if(ShapeId==2 && (i+j<(Size/2)-1||i-j>Size/2||j-i>Size/2||i+j>(Size/2)+(Size-1)) ){
            row.push(2)
        }
        else if(ShapeId==3 && (x>j&&x>i||Size-x<=j&&x>i||Size-x<=i&&x>j||Size-x<=i&&Size-x<=j)){
            row.push(2) 
         }
          else if(Seed > Math.random() * 1){
              row.push(1)
          }
          else{
            row.push(0)
          }
          
      }
      grid1.push(row)
    }

    return grid1
  }

  const SizeChange = (event) => {
    //setSize(event.target.value) 
    Size = event.target.value
     width = (500/Size)
     height = (500/Size)
    clearInterval(stop)
    setGrid(randomGrid)
    console.log(Size+"------Size------")
  }

  const IntervalChange = (event) => {
    setNewInterval(parseInt(event.target.value))
    //Interval =parseInt(event.target.value)
    clearInterval(stop)
    setGrid(randomGrid)

    console.log(Intervall+"------Intervall------")
  }
  const SeedlChange = (event) => {
    //setSeed(Number(event.target.value))
    Seed =Number(event.target.value)
    clearInterval(stop)
    setGrid(randomGrid)

    console.log(Seed+"------Seed------")
  }

  const ShapeChange = (event) => {
    //setSeed(Number(event.target.value))
    ShapeId =Number(event.target.value)
    clearInterval(stop)
    setGrid(randomGrid)

    console.log(ShapeId+"------ShapeId------")
  }
  

  const positions = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
  ]

  const fstop = () => {
    runMode=false
    clearInterval(stop)
    console.log("-------Active-stop--------")
  }

  const run = () => {

   if(runMode){

  console.log("-------Active run----------")
  
  setGrid((g) => {
    const next = g.map((row, i) => {
      return row.map((cell, j) => {
        let sum = 0
        if(cell!=2){
        positions.forEach((position) => {
          const x = i + position[0]
          const y = j + position[1]
          if (x >= 0 && x < Size && y >= 0 && y < Size&&g[x][y]!=2) {
            sum += g[x][y]
          }
        })
        if (sum < 2 || sum > 3) {
          return 0
        }
        if (sum === 3) {
          return 1
        }}
        return g[i][j]
      })
    })
    return next
  })

}

  }

    return(<div>
    <br/>
    
    <span style={
        { backgroundColor:"DodgerBlue",
        display: "flex",
        flexWrap: "wrap",
        width: 800,
        height: 150,
        margin: "auto",
        border: "1px solid black"
        }}>
            <span style={{ margin: "auto"}}><h1>GAME OF LIFE</h1>
            <div >By Yosi Cohen</div>
            </span>
            </span>

            <br/>
            <span style={
                { backgroundColor:"",
                    display: "flex",
                    flexWrap: "wrap",
                    width: 900,
                    height: 150,
                    margin: "auto",
                    border: "2px solid black"
                    }}>
                        <button style={{ width: 300,height: 30 ,backgroundColor:"DodgerBlue"}} onClick={() => {
                            runMode=true
                            if(runMode){
                           stop = setInterval(run, Intervall);
                            }
                            }}>
                                Start
                                </button>

                                <button
                                style={{ width: 300,height: 30 ,backgroundColor:"DodgerBlue"}}onClick={fstop}>
                                    Stop
                                    </button>
                                    <button
                                    style={{ width: 300,height: 30 ,backgroundColor:"DodgerBlue"}}onClick={() => setGrid(randomGrid)}>
                                        Reset
                                        </button>
                                        <fieldset style={{margin: "auto"}}>
                                            <legend>Size:</legend>
                                            Choose  :<br/>
                                            <select type="number" id="Size" name="Size" value={Size} onChange={SizeChange} style={{ width: 100,height: 30}}>
                                            <option value="6">6x6</option>
                                            <option value="10">10x10</option>
                                            <option value="15">15x15</option>
                                            <option value="20">20x20</option>
                                            <option value="30">30x30</option>
                                            <option value="50">50x50</option>
                                            <option value="100">100x100</option>
                                            </select>
                                        </fieldset>
                                        <fieldset style={{margin: "auto"}}>

                                            <legend>Speed:</legend>
                                            Choose  :<br/>
                                            <select id="Speed" name="Speed" value={Intervall} onChange={IntervalChange} style={{ width: 100,height: 30}}>
                                            <option value="2000">Very Slow</option>
                                            <option value="1000">Slow</option>
                                            <option value="500">Normal</option>
                                            <option value="200">Fast</option>
                                            <option value="0">Very Fast</option>
                                            </select>
                                        </fieldset>

                                            <fieldset style={{margin: "auto"}}>
                                                <legend>Seed:</legend>
                                                Choose  :<br/>
                                                <select id="Speed" name="Speed" value={Seed} onChange={SeedlChange} style={{ width: 100,height: 30}}>
                                                <option value="0.1">low </option>
                                                <option value="0.3">medium </option>
                                                <option value="0.5">high </option>
                                                </select>
                                            </fieldset>

                                            <fieldset style={{margin: "auto"}}>
                                                <legend>Shape:</legend>
                                                Choose  :<br/>
                                                <select id="Speed" name="Speed" value={ShapeId} onChange={ShapeChange} style={{ width: 100,height: 30}}>
                                                <option value="1">Regular</option>
                                                <option value="2">Diamond </option>
                                                <option value="3">Cross </option>
                                                </select>
                                            </fieldset>

                                        </span>

    <br/><br/>

 <div style={{ display: "flex", flexWrap: "wrap" ,width: 500,height: 500,margin: "auto"}}>
  {grid &&
    grid.map((rows, i) =>(
    
        rows.map((col, k) => (
            <div key={k} style={{
                width: width,
                height: height}}>
        <div key={k}
          style={{
            width: width,
            height: height,
            backgroundColor: col==1 ? "DodgerBlue" : col==2 ?"white":"black",
            border: "1px solid LightGray",
          }}
        /></div>
     ))
      
     ))}
</div>
<br/><br/><br/><br/>  
        
    </div>)
}

export default Main