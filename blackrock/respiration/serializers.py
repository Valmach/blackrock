from rest_framework import serializers

class TreeSpeciesSerializer(serializers.Serializer):

    class Meta:
        fields = ('name', 'basetemp', 'E0', 'R0', 'percent')


class ScenarioSerializer(serializers.Serializer):
    treespecies = TreeSpeciesSerializer(many=True)

    class Meta:
        fields = ('name', 'year', 'fieldstation', 'leafarea',
                  'startdate', 'enddate', 'deltat')
