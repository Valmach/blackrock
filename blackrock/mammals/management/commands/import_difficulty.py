from blackrock.mammals.models import GridSquare
from django.core.management.base import BaseCommand


access_difficulty_table = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],  # 1
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],  # 2
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, ],  # 3
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2,
        3, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, ],  # 4
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 3, 2,
        4, 3, 4, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, ],  # 5
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 4, 3,
        4, 4, 4, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, ],  # 6
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 5, 4,
        3, 3, 4, 3, 2, 1, 1, 1, 1, 0, 0, 4, 0, ],  # 7
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 5, 3, 3,
        2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 3, 3, 0, ],  # 8
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 4, 3,
        2, 2, 1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4, ],  # 9
    [0, 0, 0, 0, 0, 0, 0, 0, 4, 5, 5, 4, 4, 2,
        1, 1, 1, 1, 1, 1, 3, 4, 3, 4, 5, 5, 5, ],  # 10
    [0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 2, 1,
        1, 1, 2, 3, 3, 2, 2, 3, 3, 4, 4, 5, 5, ],  # 11
    [0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 5, 4, 2, 2,
        2, 1, 1, 3, 4, 2, 2, 3, 4, 5, 4, 4, 5, ],  # 12
    [0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 3, 2, 3,
        3, 1, 1, 2, 3, 3, 3, 4, 5, 5, 5, 5, 5, ],  # 13
    [0, 0, 0, 0, 0, 0, 0, 0, 5, 4, 4, 3, 3, 4,
        3, 2, 2, 2, 3, 3, 0, 4, 5, 5, 5, 5, 0, ],  # 14
    [0, 0, 0, 0, 0, 0, 0, 5, 5, 4, 3, 4, 5, 4,
        3, 2, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, ],  # 15
    [0, 0, 0, 0, 0, 0, 0, 5, 5, 3, 3, 4, 5, 4,
        3, 3, 4, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, ],  # 16
    [0, 0, 0, 0, 0, 0, 0, 5, 5, 4, 4, 4, 4, 4,
        4, 4, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],  # 17
    [0, 0, 0, 0, 0, 0, 0, 5, 4, 4, 4, 4, 5, 4,
        4, 4, 5, 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, ],  # 18
    [0, 0, 3, 0, 5, 0, 5, 5, 5, 4, 4, 4, 4, 4,
        0, 0, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, ],  # 19
    [0, 0, 3, 4, 5, 5, 5, 0, 5, 5, 5, 4, 5, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],  # 20
    [0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 5, 5, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],  # 21
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],  # 22
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ],  # 23
    #?,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,]
]  # 22 rows


class Command(BaseCommand):

    def handle(self, *app_labels, **options):
        for i in range(0, 22):
            for j in range(0, 27):
                the_square = GridSquare.objects.get(row=i, column=j)
                if the_square.display_this_square:
                    print i, j
                    print the_square.battleship_coords()
                    print access_difficulty_table[i][j]
                    the_square.access_difficulty = access_difficulty_table[
                        i][j]
                    the_square.save()
