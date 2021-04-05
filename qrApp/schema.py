from graphene_django import DjangoObjectType
from .models import ChronicDisease, Allergy, UserProfile, QrURL
import graphene
from dateutil.relativedelta import relativedelta
from graphene import InputObjectType
import graphql_jwt
from django.contrib.auth.models import User
from graphene_file_upload.scalars import Upload
from django.conf import settings



class UserType(DjangoObjectType):
    class Meta:
        model = UserProfile
    
    img_url = graphene.String()
    def resolve_img_url(self, info, **kwargs):
        return settings.BASE_URL+self.img.url if self.img else None

class ChronicDiseaseType(DjangoObjectType):
    class Meta:
        model = ChronicDisease        

class AllergyType(DjangoObjectType):
    class Meta:
        model = Allergy
    
class QrUrlType(DjangoObjectType):
    class Meta:
        model = QrURL     
    
class Query(graphene.ObjectType):
    
    all_users = graphene.List(UserType)
    def resolve_all_users(self, info, **kwargs):
        return UserProfile.objects.all()
    
    url = graphene.Field(QrUrlType, url=graphene.String())
    def resolve_url(self, info, **kwargs):
        return QrURL.objects.get(url=kwargs["url"])

    user = graphene.Field(UserType)
    def resolve_user(self, info, **kwargs):
        return info.context.user.userprofile
    
    chronics = graphene.List(ChronicDiseaseType)
    def resolve_chronics(self, info, **kwargs):
        return ChronicDisease.objects.filter(user = info.context.user.userprofile)
    
    allergies = graphene.List(AllergyType)
    def resolve_allergies(self,info,**kwargs):
        return Allergy.objects.filter(user = info.context.user.userprofile)
    
class EditUser(graphene.Mutation):
    user = graphene.Field(UserType)
    class Arguments:
        first_name = graphene.String()
        last_name = graphene.String()    
        dni = graphene.String()  
        prepaid_health = graphene.String()
        emergency_number = graphene.String() 
        prepaidId =  graphene.String() 
        blood_type =  graphene.String() 
        wheight = graphene.String() 
        img = Upload()
        
    def mutate(self, info, **inputs):
        user =  info.context.user.userprofile

        for k in inputs:
            if k == "img":
                print(inputs[k])
                if inputs[k] and hasattr(inputs[k], "read") :
                    user.img = inputs[k]
                elif inputs[k] == None:
                    user.img = None
            else:
                setattr(user, k, inputs[k])

        user.save()
            
        return EditUser(user=user)

class CreateUser(graphene.Mutation):
    user = graphene.Field(UserType)
    class Arguments:
        username = graphene.String()
        email = graphene.String()
        password = graphene.String()
        first_name = graphene.String()
        last_name = graphene.String()    
        dni = graphene.String()  
        prepaid_health = graphene.String()
        emergency_number = graphene.String() 
        prepaidId =  graphene.String() 
        blood_type =  graphene.String() 
        
        
    def mutate(self, info, **inputs):
        user = User.objects.create_user('john', 'lennon@thebeatles.com', 'johnpassword')
        first_name = inputs["first_name"]
        blood_type = inputs["blood_type"]
        dni = inputs["dni"]
        emergency_number = inputs["emergency_number"]
        last_name = inputs["last_name"]
        prepaid_health = inputs["prepaid_health"]
        prepaidId = inputs["prepaidId"]

        user_profile = UserProfile.objects.create(user=user, blood_type=blood_type, first_name=first_name, dni=dni, emergency_number=emergency_number, last_name=last_name, prepaid_health=prepaid_health, prepaidId=prepaidId)

        

        user.save()
        user_profile.save()
            
        return CreateUser(user=user_profile)

class ActivateCode(graphene.Mutation):
    success = graphene.Boolean()
    class Arguments:
        qr_url = graphene.String()
        
    def mutate(self, info, **inputs):
        user = info.context.user.userprofile
        qr_url = inputs.pop("qr_url", None)

        try:
            qr_objet = QrURL.objects.get(url=qr_url)
            qr_objet.user = user
            qr_objet.save()
        except Exception:
            raise Exception
        
        return ActivateCode(success=True)


class Mutation(graphene.ObjectType):
    edit_user = EditUser.Field()
    activate_code = ActivateCode.Field()
    token_auth = graphql_jwt.relay.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.relay.Verify.Field()
    refresh_token = graphql_jwt.relay.Refresh.Field()

schema = graphene.Schema(query=Query ,mutation=Mutation)