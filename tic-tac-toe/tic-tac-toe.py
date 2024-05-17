def print_board(board):
    display_board = [
        str(i + 1) if spot == " " else spot for i, spot in enumerate(board)
    ]
    for row in [display_board[i : i + 3] for i in range(0, len(display_board), 3)]:
        print("|".join(row))
        print("-" * 5)


def check_winner(board, player):
    win_conditions = [
        (0, 1, 2),
        (3, 4, 5),
        (6, 7, 8),  # rows
        (0, 3, 6),
        (1, 4, 7),
        (2, 5, 8),  # columns
        (0, 4, 8),
        (2, 4, 6),
    ]  # diagonals
    return any(
        all(board[pos] == player for pos in condition) for condition in win_conditions
    )


def is_draw(board):
    return " " not in board


# Recursively evaluates all possible moves using the Minimax algorithm.
# Returns a score based on whether the computer is winning, losing, or drawing
# checks for a winner or draw condition at each recursion level and assigns a score accordingly
def minimax(board, depth, is_maximizing, computer, player):
    if check_winner(board, computer):
        return 1
    if check_winner(board, player):
        return -1
    if is_draw(board):
        return 0

    # A boolean that indicates whether the current layer of recursion is maximizing or minimizing the score.
    if is_maximizing:
        best_score = -float("inf")
        for i in range(9):
            if board[i] == " ":
                board[i] = computer
                score = minimax(board, depth + 1, False, computer, player)
                board[i] = " "
                best_score = max(score, best_score)
        return best_score
    else:
        best_score = float("inf")
        for i in range(9):
            if board[i] == " ":
                board[i] = player
                score = minimax(board, depth + 1, True, computer, player)
                board[i] = " "
                best_score = min(score, best_score)
        return best_score


# Uses the minimax function to choose the best possible move for the computer.
def computer_move(board, computer, player):
    best_score = -float("inf")
    best_move = None
    for i in range(9):
        if board[i] == " ":
            board[i] = computer
            # iterates over all possible moves, evaluates them using minimax, and selects the move with the highest score.
            score = minimax(board, 0, False, computer, player)
            board[i] = " "
            if score > best_score:
                best_score = score
                best_move = i
    board[best_move] = computer


def tic_tac_toe():
    board = [" " for _ in range(9)]
    player = "X"
    computer = "O"

    while True:
        print_board(board)
        try:
            move = int(input("Enter your move (1-9): ")) - 1
            if move < 0 or move >= 9:
                print("Invalid move. Please enter a number between 1 and 9.")
                continue
            if board[move] != " ":
                print("Spot already taken. Try again.")
                continue
        except ValueError:
            print("Invalid input. Please enter a number between 1 and 9.")
            continue

        board[move] = player

        if check_winner(board, player):
            print_board(board)
            print("Congratulations! You win!")
            break

        if is_draw(board):
            print_board(board)
            print("It's a draw!")
            break

        computer_move(board, computer, player)

        if check_winner(board, computer):
            print_board(board)
            print("Computer wins! Better luck next time.")
            break

        if is_draw(board):
            print_board(board)
            print("It's a draw!")
            break


if __name__ == "__main__":
    tic_tac_toe()
