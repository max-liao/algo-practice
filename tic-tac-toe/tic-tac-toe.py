import random


def print_board(board):
    # show the input number if the spot has not been played yet
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


def tic_tac_toe():
    board = [" " for _ in range(9)]
    player = "X"
    computer = "O"

    def is_draw(board):
        return " " not in board

    def computer_move(board):
        available_moves = [i for i, spot in enumerate(board) if spot == " "]
        move = random.choice(available_moves)
        board[move] = computer

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

        computer_move(board)

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
