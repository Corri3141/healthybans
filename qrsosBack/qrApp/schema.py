from graphene_django import DjangoObjectType
from .models import ChronicDisease, Allergy, UserProfile
import graphene
from dateutil.relativedelta import relativedelta
from graphene import InputObjectType


class UserType(DjangoObjectType):
    class Meta:
        model = UserProfile
        
class ChronicDiseaseType(DjangoObjectType):
    class Meta:
        model = ChronicDisease        

class AllergyType(DjangoObjectType):
    class Meta:
        model = Allergy
    
class Query(graphene.ObjectType):
    
    all_users = graphene.List(UserType)
    def resolve_all_users(self, info, **kwargs):
        return UserProfile.objects.all()
    
    user = graphene.Field(UserType,user_id=graphene.String())
    def resolve_user(self, info, **kwargs):
        return UserProfile.objects.get(id = kwargs["user_id"])
    
    chronics = graphene.List(ChronicDiseaseType)
    def resolve_chronics(self, info, **kwargs):
        return ChronicDisease.objects.filter(user__id = kwargs["user_id"])
    
    allergies = graphene.List(AllergyType,user_id=graphene.String())
    def resolve_allergies(self,info,**kwargs):
        return Allergy.objects.filter(user__id = kwargs["user_id"])
    

    

schema = graphene.Schema(query=Query)