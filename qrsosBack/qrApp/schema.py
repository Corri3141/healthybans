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
    
class EditUser(graphene.Mutation):
    user = graphene.Field(UserType)
    class Arguments:
        id = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()    
        dni = graphene.String()  
        prepaid_health = graphene.String()
        emergency_number = graphene.String()  
        
    def mutate(self, info, **inputs):
        print(inputs)
        user = UserProfile.objects.get(user__id=inputs.get("id"))

        first_name = inputs.get("first_name")
        if first_name:
            user.first_name = first_name

        last_name = inputs.get("last_name")    
        if last_name:
            user.last_name = last_name

        dni = inputs.get("dni")
        if dni:
            user.dni = dni
        
        prepaid_health = inputs.get("prepaid_health")
        if dni:
            user.prepaid_health = prepaid_health
        
        emergency_number = inputs.get("emergency_number")
        if emergency_number:
            user.emergency_number = emergency_number

        user.save()
            
        return EditUser(user=user)

class Mutation(graphene.ObjectType):
    edit_user = EditUser.Field()

schema = graphene.Schema(query=Query ,mutation=Mutation)