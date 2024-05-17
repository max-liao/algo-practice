import random


def print_board(board):
    for row in [board[i : i + 3] for i in range(0, len(board), 3)]:
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
        move = int(input("Enter your move (1-9): ")) - 1

        if board[move] != " ":
            print("Spot already taken. Try again.")
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