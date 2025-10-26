'use client'

import { useState, useEffect } from 'react'
import enMessages from '@/messages/en.json'
import itMessages from '@/messages/it.json'

type CellState = 'empty' | 'ship' | 'hit' | 'miss'
type Cell = {
  state: CellState
  shipId?: number
}
type Grid = Cell[][]
type Orientation = 'horizontal' | 'vertical'
type GamePhase = 'setup' | 'playing' | 'gameOver'
type Locale = 'it' | 'en'

type Ship = {
  id: number
  nameKey: string
  size: number
  placed: boolean
  hits: number
}

const GRID_SIZE = 10
const SHIP_CONFIGS: Omit<Ship, 'placed' | 'hits'>[] = [
  { id: 1, nameKey: 'game.ships.carrier', size: 5 },
  { id: 2, nameKey: 'game.ships.battleship', size: 4 },
  { id: 3, nameKey: 'game.ships.cruiser', size: 3 },
  { id: 4, nameKey: 'game.ships.submarine', size: 3 },
  { id: 5, nameKey: 'game.ships.destroyer', size: 2 },
]

const createEmptyGrid = (): Grid => {
  return Array(GRID_SIZE)
    .fill(null)
    .map(() =>
      Array(GRID_SIZE)
        .fill(null)
        .map(() => ({ state: 'empty' as CellState }))
    )
}

const canPlaceShip = (
  grid: Grid,
  row: number,
  col: number,
  size: number,
  orientation: Orientation
): boolean => {
  if (orientation === 'horizontal') {
    if (col + size > GRID_SIZE) return false
    for (let i = 0; i < size; i++) {
      if (grid[row][col + i].state === 'ship') return false
    }
  } else {
    if (row + size > GRID_SIZE) return false
    for (let i = 0; i < size; i++) {
      if (grid[row + i][col].state === 'ship') return false
    }
  }
  return true
}

const placeShip = (
  grid: Grid,
  row: number,
  col: number,
  size: number,
  orientation: Orientation,
  shipId: number
): Grid => {
  const newGrid = grid.map(r => r.map(c => ({ ...c })))
  if (orientation === 'horizontal') {
    for (let i = 0; i < size; i++) {
      newGrid[row][col + i] = { state: 'ship', shipId }
    }
  } else {
    for (let i = 0; i < size; i++) {
      newGrid[row + i][col] = { state: 'ship', shipId }
    }
  }
  return newGrid
}

const placeShipsRandomly = (): Grid => {
  let grid = createEmptyGrid()
  const ships = [...SHIPS]

  for (const ship of ships) {
    let placed = false
    let attempts = 0
    while (!placed && attempts < 100) {
      const orientation: Orientation = Math.random() > 0.5 ? 'horizontal' : 'vertical'
      const row = Math.floor(Math.random() * GRID_SIZE)
      const col = Math.floor(Math.random() * GRID_SIZE)

      if (canPlaceShip(grid, row, col, ship.size, orientation)) {
        grid = placeShip(grid, row, col, ship.size, orientation, ship.id)
        placed = true
      }
      attempts++
    }
  }
  return grid
}

export default function BattleshipGame() {
  const [locale, setLocale] = useState<Locale>('it')
  const [phase, setPhase] = useState<GamePhase>('setup')
  const [playerGrid, setPlayerGrid] = useState<Grid>(createEmptyGrid())
  const [aiGrid, setAiGrid] = useState<Grid>(createEmptyGrid())
  const [playerShips, setPlayerShips] = useState<Ship[]>(
    SHIP_CONFIGS.map(s => ({ ...s, placed: false, hits: 0 }))
  )
  const [aiShips, setAiShips] = useState<Ship[]>(
    SHIP_CONFIGS.map(s => ({ ...s, placed: false, hits: 0 }))
  )
  const [orientation, setOrientation] = useState<Orientation>('horizontal')
  const [currentShipIndex, setCurrentShipIndex] = useState(0)
  const [message, setMessage] = useState('')
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [winner, setWinner] = useState<string | null>(null)

  // Translation function
  const t = (key: string): string => {
    const messages = locale === 'en' ? enMessages : itMessages
    const keys = key.split('.')
    let value: unknown = messages
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  // Initialize message on mount and locale change
  useEffect(() => {
    if (phase === 'setup') {
      setMessage(t('game.status.placeShips'))
    }
  }, [locale, phase])

  const handleSetupClick = (row: number, col: number) => {
    if (currentShipIndex >= SHIP_CONFIGS.length) return

    const ship = playerShips[currentShipIndex]
    if (canPlaceShip(playerGrid, row, col, ship.size, orientation)) {
      const newGrid = placeShip(playerGrid, row, col, ship.size, orientation, ship.id)
      setPlayerGrid(newGrid)

      const newShips = [...playerShips]
      newShips[currentShipIndex].placed = true
      setPlayerShips(newShips)

      setCurrentShipIndex(currentShipIndex + 1)

      if (currentShipIndex + 1 >= SHIP_CONFIGS.length) {
        setMessage(t('game.status.allPlaced'))
      } else {
        const nextShip = SHIP_CONFIGS[currentShipIndex + 1]
        setMessage(`${t('game.status.placeShips')}: ${t(nextShip.nameKey)} (${nextShip.size} ${t('game.setup.cells')})`)
      }
    } else {
      setMessage(t('game.status.invalidPosition'))
    }
  }

  const startGame = () => {
    const aiGridWithShips = placeShipsRandomly()
    setAiGrid(aiGridWithShips)
    setAiShips(SHIP_CONFIGS.map(s => ({ ...s, placed: true, hits: 0 })))
    setPhase('playing')
    setMessage(t('game.status.yourTurn'))
    setIsPlayerTurn(true)
  }

  const handlePlayerShot = (row: number, col: number) => {
    if (!isPlayerTurn || phase !== 'playing') return
    if (aiGrid[row][col].state === 'hit' || aiGrid[row][col].state === 'miss') return

    const newGrid = aiGrid.map(r => r.map(c => ({ ...c })))
    const cell = newGrid[row][col]

    if (cell.state === 'ship') {
      cell.state = 'hit'
      setMessage(t('game.status.hit'))

      const shipId = cell.shipId!
      const newAiShips = [...aiShips]
      const shipIndex = newAiShips.findIndex(s => s.id === shipId)
      newAiShips[shipIndex].hits++

      if (newAiShips[shipIndex].hits === newAiShips[shipIndex].size) {
        setMessage(`${t('game.status.sunk')} ${t(newAiShips[shipIndex].nameKey)}`)
      }

      setAiShips(newAiShips)

      if (newAiShips.every(s => s.hits === s.size)) {
        setPhase('gameOver')
        setWinner('Giocatore')
        setMessage(t('game.status.youWon'))
        setAiGrid(newGrid)
        return
      }
    } else {
      cell.state = 'miss'
      setMessage(t('game.status.miss'))
    }

    setAiGrid(newGrid)
    setIsPlayerTurn(false)

    setTimeout(() => {
      aiTurn()
    }, 1000)
  }

  const aiTurn = () => {
    // Raggruppa le celle colpite per nave
    const hitsByShip = new Map<number, [number, number][]>()
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (playerGrid[r][c].state === 'hit') {
          const shipId = playerGrid[r][c].shipId
          if (shipId) {
            const ship = playerShips.find(s => s.id === shipId)
            if (ship && ship.hits < ship.size) {
              if (!hitsByShip.has(shipId)) {
                hitsByShip.set(shipId, [])
              }
              hitsByShip.get(shipId)!.push([r, c])
            }
          }
        }
      }
    }

    let targetRow = -1
    let targetCol = -1

    // Strategia intelligente: analizza le navi colpite
    if (hitsByShip.size > 0) {
      // Prendi la prima nave colpita ma non affondata
      const [shipId, hits] = Array.from(hitsByShip.entries())[0]
      const ship = playerShips.find(s => s.id === shipId)!

      if (hits.length === 1) {
        // Solo un colpo: prova le 4 direzioni
        const [r, c] = hits[0]
        const directions = [
          [r - 1, c], // su
          [r + 1, c], // giù
          [r, c - 1], // sinistra
          [r, c + 1], // destra
        ]

        const validTargets: [number, number][] = []
        for (const [nr, nc] of directions) {
          if (
            nr >= 0 &&
            nr < GRID_SIZE &&
            nc >= 0 &&
            nc < GRID_SIZE &&
            playerGrid[nr][nc].state !== 'hit' &&
            playerGrid[nr][nc].state !== 'miss'
          ) {
            validTargets.push([nr, nc])
          }
        }

        if (validTargets.length > 0) {
          const [r, c] = validTargets[Math.floor(Math.random() * validTargets.length)]
          targetRow = r
          targetCol = c
        }
      } else {
        // Più colpi: identifica la direzione
        hits.sort((a, b) => {
          if (a[0] !== b[0]) return a[0] - b[0] // ordina per riga
          return a[1] - b[1] // poi per colonna
        })

        const isHorizontal = hits[0][0] === hits[1][0]
        const isVertical = hits[0][1] === hits[1][1]

        if (isHorizontal) {
          // Nave orizzontale: continua a destra o sinistra
          const row = hits[0][0]
          const minCol = Math.min(...hits.map(h => h[1]))
          const maxCol = Math.max(...hits.map(h => h[1]))

          const targets: [number, number][] = []

          // Controlla se possiamo continuare a destra
          if (
            maxCol + 1 < GRID_SIZE &&
            playerGrid[row][maxCol + 1].state !== 'hit' &&
            playerGrid[row][maxCol + 1].state !== 'miss'
          ) {
            // Priorità alla continuazione nella stessa direzione
            targets.push([row, maxCol + 1])
          }

          // Controlla se possiamo continuare a sinistra
          if (
            minCol - 1 >= 0 &&
            playerGrid[row][minCol - 1].state !== 'hit' &&
            playerGrid[row][minCol - 1].state !== 'miss'
          ) {
            targets.push([row, minCol - 1])
          }

          if (targets.length > 0) {
            // Preferisci la direzione che completa la nave
            const remainingSize = ship.size - hits.length
            // Prova a continuare nella direzione già iniziata
            const [r, c] = targets[0]
            targetRow = r
            targetCol = c
          }
        } else if (isVertical) {
          // Nave verticale: continua su o giù
          const col = hits[0][1]
          const minRow = Math.min(...hits.map(h => h[0]))
          const maxRow = Math.max(...hits.map(h => h[0]))

          const targets: [number, number][] = []

          // Controlla se possiamo continuare in giù
          if (
            maxRow + 1 < GRID_SIZE &&
            playerGrid[maxRow + 1][col].state !== 'hit' &&
            playerGrid[maxRow + 1][col].state !== 'miss'
          ) {
            targets.push([maxRow + 1, col])
          }

          // Controlla se possiamo continuare in su
          if (
            minRow - 1 >= 0 &&
            playerGrid[minRow - 1][col].state !== 'hit' &&
            playerGrid[minRow - 1][col].state !== 'miss'
          ) {
            targets.push([minRow - 1, col])
          }

          if (targets.length > 0) {
            const [r, c] = targets[0]
            targetRow = r
            targetCol = c
          }
        }
      }
    }

    // Se non abbiamo trovato un target strategico, spara random
    if (targetRow === -1) {
      const emptyCells: [number, number][] = []
      for (let r = 0; r < GRID_SIZE; r++) {
        for (let c = 0; c < GRID_SIZE; c++) {
          if (playerGrid[r][c].state !== 'hit' && playerGrid[r][c].state !== 'miss') {
            emptyCells.push([r, c])
          }
        }
      }

      if (emptyCells.length === 0) return

      const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)]
      targetRow = r
      targetCol = c
    }

    const newGrid = playerGrid.map(r => r.map(c => ({ ...c })))
    const cell = newGrid[targetRow][targetCol]

    if (cell.state === 'ship') {
      cell.state = 'hit'
      
      const shipId = cell.shipId!
      const newPlayerShips = [...playerShips]
      const shipIndex = newPlayerShips.findIndex(s => s.id === shipId)
      newPlayerShips[shipIndex].hits++

      if (newPlayerShips[shipIndex].hits === newPlayerShips[shipIndex].size) {
        setMessage(`${t('game.status.enemySunk')} ${t(newPlayerShips[shipIndex].nameKey)}!`)
      } else {
        setMessage(t('game.status.enemyHit'))
      }

      setPlayerShips(newPlayerShips)

      if (newPlayerShips.every(s => s.hits === s.size)) {
        setPhase('gameOver')
        setWinner('AI')
        setMessage(t('game.status.youLost'))
        setPlayerGrid(newGrid)
        return
      }
    } else {
      cell.state = 'miss'
    }

    setPlayerGrid(newGrid)

    setTimeout(() => {
      setIsPlayerTurn(true)
      if (cell.state === 'miss') {
        setMessage(t('game.status.enemyMiss'))
      }
    }, 1000)
  }

  const resetGame = () => {
    setPhase('setup')
    setPlayerGrid(createEmptyGrid())
    setAiGrid(createEmptyGrid())
    setPlayerShips(SHIP_CONFIGS.map(s => ({ ...s, placed: false, hits: 0 })))
    setAiShips(SHIP_CONFIGS.map(s => ({ ...s, placed: false, hits: 0 })))
    setOrientation('horizontal')
    setCurrentShipIndex(0)
    setMessage(t('game.status.placeShips'))
    setIsPlayerTurn(true)
    setWinner(null)
  }

  const toggleLocale = () => {
    setLocale(prev => prev === 'it' ? 'en' : 'it')
  }

  const renderGrid = (grid: Grid, isAi: boolean, phase: GamePhase) => {
    const letters = 'ABCDEFGHIJ'.split('')

    return (
      <div className="inline-block">
        <div className="flex gap-1 mb-1 ml-6">
          {Array.from({ length: GRID_SIZE }, (_, i) => (
            <div key={i} className="w-8 h-6 flex items-center justify-center text-xs font-mono text-cyan-400">
              {i + 1}
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          <div className="flex flex-col gap-1">
            {letters.map(letter => (
              <div key={letter} className="w-6 h-8 flex items-center justify-center text-xs font-mono text-cyan-400">
                {letter}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-10 gap-1">
            {grid.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const isSetup = phase === 'setup'
                const showShip = !isAi || cell.state === 'hit'

                let bgColor = 'bg-black border-2 border-cyan-400'
                if (cell.state === 'ship' && showShip) bgColor = 'bg-cyan-400 border-2 border-cyan-400'
                if (cell.state === 'hit') bgColor = 'bg-red-500 border-2 border-red-400'
                if (cell.state === 'miss') bgColor = 'bg-white border-2 border-gray-400'

                const canClick =
                  (isSetup && !isAi) || (phase === 'playing' && isAi && isPlayerTurn)

                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    onClick={() => {
                      if (isSetup && !isAi) {
                        handleSetupClick(rowIndex, colIndex)
                      } else if (phase === 'playing' && isAi) {
                        handlePlayerShot(rowIndex, colIndex)
                      }
                    }}
                    disabled={!canClick}
                    className={`w-8 h-8 ${bgColor} ${
                      canClick ? 'hover:opacity-80 cursor-pointer hover:shadow-lg hover:shadow-cyan-400/50' : 'cursor-not-allowed'
                    } transition-all duration-200`}
                  />
                )
              })
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen p-8 bg-black text-cyan-400 font-mono">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 border-2 border-cyan-400 flex items-center justify-center">
              <div className="w-6 h-6 bg-cyan-400"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-cyan-400 tracking-wider">
                {t('game.title')}
              </h1>
              <p className="text-sm text-blue-300 tracking-wider">
                {t('game.subtitle')}
              </p>
            </div>
          </div>
          
          {/* Language Switcher */}
          <button
            onClick={toggleLocale}
            className="flex items-center gap-2 px-4 py-2 border-2 border-cyan-400 bg-black text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-200 hover:shadow-lg hover:shadow-cyan-400/50"
          >
            <span className="text-xl">🌐</span>
            <span className="font-mono font-bold">{locale.toUpperCase()}</span>
          </button>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-16 text-cyan-400 text-6xl">⚓</div>
            <h1 className="text-5xl font-bold text-cyan-400 tracking-wider">
              {t('game.title')}
            </h1>
          </div>
          <p className="text-sm text-blue-300 tracking-wider mb-4">
            {t('game.subtitle2')}
          </p>
          <div className="w-full h-px bg-cyan-400 mb-4"></div>
        </div>

        {/* Status Panel */}
        <div className="border-2 border-green-400 bg-black/50 p-6 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-green-400"></div>
            <h2 className="text-lg font-bold text-green-400 tracking-wider">
              {t('game.status.title')}
            </h2>
          </div>
          <p className="text-green-400 font-mono text-sm mb-2">{message}</p>
          {phase === 'gameOver' && winner && (
            <p className="text-green-400 font-mono text-lg font-bold">
              {winner === 'Giocatore' ? t('game.status.victory') : t('game.status.defeat')}
            </p>
          )}
        </div>

        {phase === 'setup' && (
          <div className="mb-6 flex flex-col items-center gap-6">
            {/* Ship Placement Panel */}
            <div className="border-2 border-green-400 bg-black/50 p-6 w-full max-w-md">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 bg-green-400"></div>
                <h2 className="text-lg font-bold text-green-400 tracking-wider">
                  {t('game.setup.title')}
                </h2>
              </div>
              
              <div className="mb-4">
                <p className="text-green-400 font-mono text-sm mb-2">
                  {t('game.setup.currentShip')}
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-4 bg-gray-600 border border-red-500"></div>
                  <span className="text-green-400 font-mono">
                    {currentShipIndex < SHIP_CONFIGS.length
                      ? `${t(SHIP_CONFIGS[currentShipIndex].nameKey)} (${SHIP_CONFIGS[currentShipIndex].size} ${t('game.setup.cells')})`
                      : t('game.setup.allPlaced')}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setOrientation(orientation === 'horizontal' ? 'vertical' : 'horizontal')
                  }
                  className="flex items-center gap-2 px-4 py-2 border-2 border-green-400 bg-black text-green-400 hover:bg-green-400 hover:text-black transition-colors font-mono text-sm"
                >
                  <div className="w-4 h-4 border border-green-400"></div>
                  {orientation === 'horizontal' ? t('game.buttons.horizontal') : t('game.buttons.vertical')}
                </button>

                <button
                  onClick={resetGame}
                  className="flex items-center gap-2 px-4 py-2 border-2 border-green-400 bg-black text-green-400 hover:bg-green-400 hover:text-black transition-colors font-mono text-sm"
                >
                  <div className="w-4 h-4 border border-green-400"></div>
                  {t('game.buttons.reset')}
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              {renderGrid(playerGrid, false, phase)}
            </div>

            {currentShipIndex >= SHIP_CONFIGS.length && (
              <button
                onClick={startGame}
                className="px-8 py-4 border-2 border-cyan-400 bg-black text-cyan-400 text-lg font-bold tracking-wider hover:bg-cyan-400 hover:text-black transition-colors font-mono"
              >
                {t('game.buttons.startGame')}
              </button>
            )}
          </div>
        )}

        {(phase === 'playing' || phase === 'gameOver') && (
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-start">
            {/* Player Fleet */}
            <div className="flex flex-col items-center">
              <div className="border-2 border-cyan-400 bg-black/50 p-4 mb-4 w-full">
                <h2 className="text-lg font-bold text-cyan-400 tracking-wider mb-2">
                  {t('game.fleet.allied')}
                </h2>
                <div className="space-y-1">
                  {playerShips.map(ship => (
                    <div key={ship.id} className="flex items-center gap-2 text-sm font-mono">
                      <div className={`w-3 h-3 ${ship.hits === ship.size ? 'bg-red-500' : 'bg-cyan-400'}`}></div>
                      <span className={ship.hits === ship.size ? 'line-through text-red-400' : 'text-cyan-400'}>
                        {t(ship.nameKey)}
                      </span>
                      <span className="text-blue-300">
                        ({ship.hits}/{ship.size})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {renderGrid(playerGrid, false, phase)}
            </div>

            {/* Enemy Fleet */}
            <div className="flex flex-col items-center">
              <div className="border-2 border-red-400 bg-black/50 p-4 mb-4 w-full">
                <h2 className="text-lg font-bold text-red-400 tracking-wider mb-2">
                  {t('game.fleet.enemy')}
                </h2>
                <div className="space-y-1">
                  {aiShips.map(ship => (
                    <div key={ship.id} className="flex items-center gap-2 text-sm font-mono">
                      <div className={`w-3 h-3 ${ship.hits === ship.size ? 'bg-red-500' : 'bg-red-400'}`}></div>
                      <span className={ship.hits === ship.size ? 'line-through text-red-400' : 'text-red-400'}>
                        {t(ship.nameKey)}
                      </span>
                      <span className="text-blue-300">
                        ({ship.hits}/{ship.size})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {renderGrid(aiGrid, true, phase)}
            </div>
          </div>
        )}

        {(phase === 'playing' || phase === 'gameOver') && (
          <div className="flex justify-center mt-8">
            <button
              onClick={resetGame}
              className="px-8 py-4 border-2 border-green-400 bg-black text-green-400 text-lg font-bold tracking-wider hover:bg-green-400 hover:text-black transition-colors font-mono"
            >
              {t('game.buttons.newGame')}
            </button>
          </div>
        )}

        {phase === 'setup' && (
          <div className="mt-8 border-2 border-blue-400 bg-black/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 bg-blue-400"></div>
              <h3 className="font-bold text-blue-400 tracking-wider font-mono">
                {t('game.instructions.title')}
              </h3>
            </div>
            <div className="space-y-2 text-blue-300 font-mono text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400"></div>
                <span>{t('game.instructions.step1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400"></div>
                <span>{t('game.instructions.step2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400"></div>
                <span>{t('game.instructions.step3')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400"></div>
                <span>{t('game.instructions.step4')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400"></div>
                <span>{t('game.instructions.step5')}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
